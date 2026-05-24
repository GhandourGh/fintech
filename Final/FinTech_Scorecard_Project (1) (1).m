%% =========================================================
%  AI IN FINTECH - PROJECT 1
%  PORTFOLIO OPTIMISATION AND PRICING INTEREST RATE
%  BY USING A SCORING MODEL
%
%  Approach (aligned with assignment slide):
%   - Train scorecard on the FULL 500 HistoricalData clients
%     (slide: "we will not take an out-of-bag clients")
%   - Keep MATLAB's autobinning (data-driven optimal bins)
%   - Logistic regression on WOE
%   - Score the 20 ActualPortfolioData clients on a 0-100 scale
%   - ROC curve on HistoricalData (slide: "use the HistoricalData
%     For simplification")
%   - Find optimal score using the KS statistic
%   - Expected Loss with recovery rate 60% -> LGD = 40%
%   - Minimum break-even interest rate = PD x LGD
% ==========================================================

clc;
clear;
close all;

%% 0. SETUP --------------------------------------------------

% Use a relative path so the project is portable
filePath = fullfile(pwd,'DataProjScoreCard.xlsx');

EAD          = 100000;           % Exposure at default per client ($100K loan)
recoveryRate = 0.60;             % Given by the assignment
LGD          = 1 - recoveryRate; % 40%

outputFolder  = fullfile(pwd,'outputs');
tablesFolder  = fullfile(outputFolder,'tables');
figuresFolder = fullfile(outputFolder,'figures');

if ~exist(outputFolder,'dir');  mkdir(outputFolder);  end
if ~exist(tablesFolder,'dir');  mkdir(tablesFolder);  end
if ~exist(figuresFolder,'dir'); mkdir(figuresFolder); end

rng(1);   % reproducibility

%% 1. LOAD DATA ---------------------------------------------

historicalData = readtable(filePath,'Sheet','HistoricalData');
portfolioData  = readtable(filePath,'Sheet','ActualPortfolioData');

% Drop trailing empty rows in the portfolio sheet
portfolioData = rmmissing(portfolioData,'MinNumMissing',4);

% Convert categorical predictors
historicalData.ResidentialStatus = categorical(historicalData.ResidentialStatus);
historicalData.EmploymentStatus  = categorical(historicalData.EmploymentStatus);
portfolioData.ResidentialStatus  = categorical(portfolioData.ResidentialStatus);
portfolioData.EmploymentStatus   = categorical(portfolioData.EmploymentStatus);

disp('--- Historical data preview ---');
disp(head(historicalData));

%% 2. DATA QUALITY ------------------------------------------

missingTable = table( ...
    historicalData.Properties.VariableNames', ...
    sum(ismissing(historicalData))', ...
    'VariableNames',{'Variable','MissingCount'});

disp('Missing values per column:');
disp(missingTable);

figure('Color','white','Name','Default Distribution');
histogram(categorical(historicalData.Default));
title('Default Distribution in HistoricalData');
xlabel('Default Status (0 = Good, 1 = Bad)');
ylabel('Number of Clients');
grid on;

%% 3. BUILD SCORECARD ON FULL HISTORICAL DATA ---------------

% Drop columns that are not predictors
scorecardData = historicalData;
if ismember('ID',scorecardData.Properties.VariableNames)
    scorecardData.ID = [];
end
if ismember('PD',scorecardData.Properties.VariableNames)
    scorecardData.PD = [];   % teacher-provided reference, not a feature
end

% --- QUESTION 1: develop a scoring model ---
sc = creditscorecard(scorecardData, ...
    'ResponseVar','Default', ...
    'GoodLabel',0);

disp('Scorecard initialised:');
disp(sc);

%% 4. BINNING AND WOE  (Question 2) -------------------------

sc = autobinning(sc);   % data-driven optimal bins

predictors = {'Age','ResidentialStatus','EmploymentStatus','Income'};

for i = 1:length(predictors)

    v = predictors{i};

    % Required MATLAB bininfo + plotbins per the assignment
    [bi,cp] = bininfo(sc,v);

    fprintf('\n=== bininfo for %s ===\n',v);
    disp(bi);

    if isnumeric(cp)
        fprintf('Cut points for %s:\n',v); disp(cp);
    end

    hFig = plotbins(sc,v, ...
        'BinText','Count', ...
        'WOE','On', ...
        'Legend','On');
    set(hFig,'Color','white','Name',['plotbins - ',v]);
    drawnow;

end

%% 5. LOGISTIC REGRESSION FIT  (Question 3) ----------------

sc = fitmodel(sc);

disp('Fitted logistic scorecard model:');
disp(sc);

%% 6. UNSCALED POINTS  (Question 4) ------------------------

unscaledPoints = displaypoints(sc);
disp('Unscaled scorecard points:');
disp(unscaledPoints);

writetable(unscaledPoints,fullfile(tablesFolder,'unscaled_points.csv'));

%% 7. SCALE SCORES TO 0-100  (Question 5) ------------------

sc = formatpoints(sc,'WorstAndBestScores',[0 100]);

scaledPoints = displaypoints(sc);
disp('Scaled scorecard points (0-100 scale):');
disp(scaledPoints);

writetable(scaledPoints,fullfile(tablesFolder,'scaled_points.csv'));

% Score the 20 portfolio clients
portfolioModelData = portfolioData;
if ismember('ID',portfolioModelData.Properties.VariableNames)
    portIDs = portfolioModelData.ID;
    portfolioModelData.ID = [];
else
    portIDs = (1:height(portfolioModelData))';
end
if ismember('PD',portfolioModelData.Properties.VariableNames)
    portfolioModelData.PD = [];
end
if ismember('LGD',portfolioModelData.Properties.VariableNames)
    portfolioModelData.LGD = [];
end
if ismember('NA',portfolioModelData.Properties.VariableNames)
    portfolioModelData.NA = [];
end
if ismember('EL',portfolioModelData.Properties.VariableNames)
    portfolioModelData.EL = [];
end
if ismember('Default',portfolioModelData.Properties.VariableNames)
    portfolioModelData.Default = [];
end

portfolioScores = score(sc,portfolioModelData);

%% 8. ROC CURVE on HistoricalData  (Question 6) ------------

Stats = validatemodel(sc,'Plot','ROC');

disp('Validation statistics on HistoricalData:');
disp(Stats);

writetable(Stats,fullfile(tablesFolder,'validation_stats.csv'));

% --- FIXED: safe extraction regardless of exact MATLAB measure name ---
% (measure strings vary slightly across MATLAB versions)
AUC     = Stats.Value(contains(Stats.Measure,'ROC','IgnoreCase',true));
KSscore = Stats.Value(contains(Stats.Measure,'KS score','IgnoreCase',true));

% Safety check: abort with a clear message if extraction fails
if isempty(AUC) || isempty(KSscore)
    disp('Available measure names in Stats:');
    disp(Stats.Measure);
    error(['Could not extract AUC or KS score from validatemodel output. ' ...
           'Check the measure names printed above and update the contains() calls.']);
end

fprintf('\nAUC = %.4f    |    KS score (optimal cutoff) = %.4f\n',AUC,KSscore);

%% 9. PROBABILITY OF DEFAULT  (Question 7) -----------------

portfolioPD = probdefault(sc,portfolioModelData);

%% 10. OPTIMAL SCORE + EXPECTED LOSS  (Question 8) ---------

optimalScore = KSscore;   % score at maximum KS separation

portfolioResults = table( ...
    portIDs, ...
    portfolioScores, ...
    portfolioPD, ...
    'VariableNames',{'ID','Score','PD_Model'});

% Decision rule: accept if Score >= optimal KS cutoff
portfolioResults.Decision = repmat("Reject",height(portfolioResults),1);
portfolioResults.Decision(portfolioResults.Score >= optimalScore) = "Accept";

% Risk band
portfolioResults.RiskBand = repmat("High Risk",height(portfolioResults),1);
portfolioResults.RiskBand(portfolioResults.Score >= 50 & portfolioResults.Score < 80) = "Medium Risk";
portfolioResults.RiskBand(portfolioResults.Score >= 80) = "Low Risk";

% Expected Loss = PD * LGD * EAD
portfolioResults.EAD          = repmat(EAD,height(portfolioResults),1);
portfolioResults.LGD          = repmat(LGD,height(portfolioResults),1);
portfolioResults.ExpectedLoss = portfolioResults.PD_Model .* LGD .* EAD;

% Minimum break-even annual interest rate = PD * LGD  (Question 9)
portfolioResults.MinRate        = portfolioResults.PD_Model .* LGD;
portfolioResults.MinRatePct     = 100 * portfolioResults.MinRate;
portfolioResults.AnnualInterest = portfolioResults.MinRate .* EAD;

portfolioResults = sortrows(portfolioResults,'Score','descend');

disp('--- Portfolio Results ---');
disp(portfolioResults);

writetable(portfolioResults,fullfile(tablesFolder,'portfolio_results.csv'));

%% 11. ACCEPTED PORTFOLIO SUMMARY --------------------------

accepted = portfolioResults(portfolioResults.Decision == "Accept",:);

writetable(accepted,fullfile(tablesFolder,'accepted_portfolio.csv'));

fprintf('\n==================== ACCEPTED PORTFOLIO ====================\n');
fprintf('Optimal KS cutoff score      : %.4f\n',optimalScore);
fprintf('Number of accepted clients   : %d\n',height(accepted));
fprintf('Number of rejected clients   : %d\n',height(portfolioResults)-height(accepted));
fprintf('Total exposure (EAD)         : $%s\n',numCommas(sum(accepted.EAD)));
fprintf('Total expected loss          : $%s\n',numCommas(sum(accepted.ExpectedLoss)));
fprintf('Average accepted PD          : %.4f\n',mean(accepted.PD_Model));
fprintf('Average minimum interest rate: %.4f%%\n',mean(accepted.MinRatePct));
fprintf('============================================================\n');

%% 12. PORTFOLIO VISUALISATIONS ----------------------------

figure('Color','white','Name','Score per client');
bar(portfolioResults.ID,portfolioResults.Score);
hold on; yline(optimalScore,'r--','Optimal KS cutoff','LineWidth',2);
title('Client Scores vs Optimal KS Cutoff');
xlabel('Client ID'); ylabel('Score (0-100)'); grid on;

figure('Color','white','Name','PD per client');
bar(portfolioResults.ID,portfolioResults.PD_Model);
title('Predicted Probability of Default per Client');
xlabel('Client ID'); ylabel('PD'); grid on;

figure('Color','white','Name','EL per client');
bar(portfolioResults.ID,portfolioResults.ExpectedLoss);
title('Expected Loss per Client ($)');
xlabel('Client ID'); ylabel('Expected Loss'); grid on;

figure('Color','white','Name','Min interest rate per client');
bar(portfolioResults.ID,portfolioResults.MinRatePct);
title('Minimum Break-even Interest Rate per Client (%)');
xlabel('Client ID'); ylabel('Interest Rate (%)'); grid on;

figure('Color','white','Name','Score vs PD');
scatter(portfolioResults.Score,portfolioResults.PD_Model,80,'filled');
title('Score vs Probability of Default');
xlabel('Score'); ylabel('PD'); grid on;

figure('Color','white','Name','Decision counts');
decCats = categorical(portfolioResults.Decision);
bar(categorical(categories(decCats)),countcats(decCats));
title('Accepted vs Rejected Clients');
ylabel('Number of Clients'); grid on;

figure('Color','white','Name','Risk band counts');
rbCats = categorical(portfolioResults.RiskBand);
bar(categorical(categories(rbCats)),countcats(rbCats));
title('Portfolio Risk Segmentation');
ylabel('Number of Clients'); grid on;

%% 13. SAVE ALL FIGURES ------------------------------------

figHandles = findall(groot,'Type','figure');
for k = 1:length(figHandles)
    figName = get(figHandles(k),'Name');
    if isempty(figName)
        figName = sprintf('Figure_%d',k);
    end
    figName = regexprep(figName,'[^a-zA-Z0-9_-]','_');
    saveas(figHandles(k),fullfile(figuresFolder,[figName,'.png']));
end

disp('============================================================');
disp('PROJECT COMPLETED. Outputs are in the /outputs folder.');
disp('============================================================');

%% --- helper -------------------------------------------------
function s = numCommas(x)
    s = regexprep(sprintf('%.2f',x),'\d(?=(\d{3})+\.)','$0,');
end
