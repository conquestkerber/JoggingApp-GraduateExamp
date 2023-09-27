# JoggingApp-GraduateExamp
An application made for a graduate thesis. It represents a full stack application that generates running training with the help of React, Node and Mysql

Flow:
1.download app
2.you need npm package for instalation and running app
3.server file:
 3.1. npm run setup  //you run script to setup database with initial data who will need to test app,credentials: email:admin@admin.com password:admin123
 3.2. npm run start  // run script for setup application
4.client file: npm run start //to run app on web

After you setup project and running app flow goes like this:
-App have two types of users : Admin and user and also different functionality for both 
-if you choose admin you go to login (-url-/login) and you enter credentuals (in part 3.1)
-if you choose user you go to register,enter some data aboute user,if it's all correct you redirect to login and some credentials enter there,if it's all correct you are in app

Admin can Generate Template for everyone or Generate Program for specific User
GenerateTemplate: Enter(button): you enter name of template and choose weeks for training then press Enter button and enter data for each week
                  EditTemplate:you have list of all templates choose one,forms shows down bellow table and edit new data 
GenerateProgram: you have table of users after you click on some user you've got data for specific user,if you want to add program for that user you enter name of program an press enter
                  after that you got a form and enter data inside that form.
                Edit: user already have some program and if you want change somethin you click on program and form shows bellow table,then change it and press enter

User: enter some data for vo2Max,vo2 that wanna reach,weeek for trening,level of trening(A,B,C),how long meter
      Next button generate that info inside database and that data is importat to admin to generate program
      Get Program: for import data(duzina trke,tezina programa i broj nedelja programa) and you must import that data you get Program for that specific data
Note: we only get data for TemplateBfor5000m and TemplateAfor5000m all others will be added later.
