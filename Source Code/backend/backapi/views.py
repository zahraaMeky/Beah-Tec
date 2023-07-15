
# from asyncio.windows_events import NULL
from datetime import datetime
import json
from operator import itemgetter
from multiprocessing.managers import Server
from subprocess import call
from wsgiref.simple_server import ServerHandler
from cv2 import circle
from django import http
import random
import string
from django.contrib.auth.hashers import make_password, check_password
from getmac import get_mac_address as gma
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import *
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.message import EmailMessage
from .serializers import *
from django.http import HttpResponse
from cryptography.fernet import Fernet
import base64
from django.conf import settings
# generate random password Function
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import User
import re
from google.oauth2 import service_account
from googleapiclient.discovery import build
from pathlib import Path
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
import requests
from django.db import connection
import os
# from datetime import datetime
import pytz
import math, random
import os
from twilio.rest import Client
import convert_numbers

EMAIL_ADDRESS = 'email'
EMAIL_PASSWORD = 'pas'
mail_server  = "smtp"
mail_port = 465

############################################

def VoteTimeDownFinish():
    timezone = pytz.timezone("Asia/Muscat") 
    now_date = datetime.now(timezone)
    y = now_date.year
    m = now_date.month
    d = now_date.day
    print(now_date)
    last_date = datetime(2023, 3, 2)
    n_date = datetime(y, m, d)
    if (n_date > last_date):
        print("yes")
        return True
    else:
        print("no")
        return False

def googlesheet_votes_data(data) -> None:
    BASE_DIR = Path(__file__).resolve().parent
    scopes = ['https://www.googleapis.com/auth/spreadsheets']
    spreadsheet_id = '1gmVlMryNssCJumfM88G9SUW3JbOjzQY5jcDuucvYl-0'
    service_account_file = str(BASE_DIR) + '/beah-tec-e29caf80ace1.json'
    creds = None
    creds = service_account.Credentials.from_service_account_file(service_account_file, scopes=scopes)
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()

    sheet.values().clear(spreadsheetId=spreadsheet_id, range='Sheet1!A2:M').execute()

    l = len(data)

    sheet.values().append(
        spreadsheetId=spreadsheet_id, range='Sheet1!A2:J' + str(l+1), valueInputOption='USER_ENTERED', body={'values': data}
    ).execute()

def put_votes_data_google_sheet():
    AppTeams=[]
    # approvedTeams=BeahTeam.objects.filter(UserStatus=0)
    approvedTeams=BeahTeam.objects.filter(UserStatus=0)
    for team in approvedTeams:
        proj = BeahProjects.objects.get(TeamID=team)
        checkVote=BeahTeamVote.objects.filter(TeamID=team)
        college = team.CollegeName_id
        collegeID = BeahTecCollege.objects.get(ID=college)

        ProjectProposal = ""
        if (len(str(proj.ProjectProposal))>3):
                if ('media/' not in str(proj.ProjectProposal) and str(proj.ProjectProposal)!="" ): ProjectProposal = "https://beah-tec.com:80/" + 'media/' +str(proj.ProjectProposal)
                else: ProjectProposal = "https://beah-tec.com:80/" + str(proj.ProjectProposal)

        project_page = "https://www.beah-tec.com/project/" + str(proj.ID)
        AppTeams.append({
            "ID":project_page,
            "TeamName":team.TeamName,
            "ProjectName":proj.ProjectName,
            "ProjectProposal":ProjectProposal,
            "CollegeName":collegeID.CollegeName,
            "checkVote":len(checkVote)
        })

    newAppTeams = sorted(AppTeams, key=lambda d: d['checkVote'], reverse=True) 

    AppTeams = []

    position = 1
    for team in newAppTeams:
        AppTeams.append([
                str(position),
                team["TeamName"],
                team["ProjectName"],
                team["CollegeName"],
                team["ProjectProposal"],
                team["ID"],
                team["checkVote"]
            ])
        position += 1
        
    googlesheet_votes_data(AppTeams)

def googlesheet_projects_data(data) -> None:
    BASE_DIR = Path(__file__).resolve().parent
    scopes = ['https://www.googleapis.com/auth/spreadsheets']
    spreadsheet_id = '1tFGrWSu1UkeaWBX2x8v6aci5mkRjKSTEuzPtrtQ7P5Y'
    service_account_file = str(BASE_DIR) + '/beah-tec-e29caf80ace1.json'
    creds = None
    creds = service_account.Credentials.from_service_account_file(service_account_file, scopes=scopes)
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()

    sheet.values().clear(spreadsheetId=spreadsheet_id, range='Sheet1!A2:M').execute()

    l = len(data)

    sheet.values().append(
        spreadsheetId=spreadsheet_id, range='Sheet1!A2:J' + str(l+1), valueInputOption='USER_ENTERED', body={'values': data}
    ).execute()

def put_projects_data_google_sheet():
        Info = []
        getteam = BeahTeam.objects.filter(selected=1)
        for team in getteam:
            getuser = BeahUsers.objects.get(ID=team.TeamID_id)
            college = team.CollegeName_id
            # get college instance
            collegeID = BeahTecCollege.objects.get(ID=college)
            collegeName = collegeID.CollegeName
            getProject = BeahProjects.objects.get(TeamID=team)
            members = BeahMember.objects.filter(TeamID=team)
            members_count = len(members)
            ProjectD = (getProject.publishDate).strftime("%d/%m/%Y")
            ProjectProposal = ""
            if (len(str(getProject.ProjectProposal))>4):
                if ('media/' not in str(getProject.ProjectProposal) and str(getProject.ProjectProposal)!="" ): ProjectProposal = "https://beah-tec.com:80/" + 'media/' +str(getProject.ProjectProposal)
                else: ProjectProposal = "https://beah-tec.com:80/" + str(getProject.ProjectProposal)

            Info.append([team.TeamName, getuser.UserEmail, team.PhoneNum, collegeName, members_count, getProject.ProjectProblem.Title , getProject.ProjectName, getProject.ProjectDescription,
                          ProjectD, ProjectProposal])
        
        googlesheet_projects_data(Info)


def googlesheet_requests_data(data) -> None:
    BASE_DIR = Path(__file__).resolve().parent
    scopes = ['https://www.googleapis.com/auth/spreadsheets']
    spreadsheet_id = '1Cfg5QKQRbKkD5WjAM3nAHJSrWox8Ye58nOUU1P9D8OY'
    service_account_file = str(BASE_DIR) + '/beah-tec-e29caf80ace1.json'
    creds = None
    creds = service_account.Credentials.from_service_account_file(service_account_file, scopes=scopes)
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()

    sheet.values().clear(spreadsheetId=spreadsheet_id, range='Sheet1!A2:M').execute()

    l = len(data)
    # print(l)

    sheet.values().append(
        spreadsheetId=spreadsheet_id, range='Sheet1!A2:J' + str(l+1), valueInputOption='USER_ENTERED', body={'values': data}
    ).execute()


def put_requests_data_google_sheet():
    allteams = []
    if True:
        teams = BeahTeam.objects.all()
        n = 1
        for team in teams:
            id = team.TeamID_id
            name = team.TeamName
            college = team.CollegeName_id
            PhoneNum = team.PhoneNum
            # get college instance
            collegeID = BeahTecCollege.objects.get(ID=college)
            collegeName = collegeID.CollegeName
            member = team.MemberNum
            # convert date to string
            date = team.JoinDate.strftime("%d-%m-%Y %-I:%M %p")
            if team.UserStatus == 1:
                status = 'غير معتمد'
            else:
                status = 'معتمد'
            getproject = BeahProjects.objects.filter(TeamID=team)
            getuserName = BeahUsers.objects.filter(ID=id)

            # # print('getproject: ', getproject)
            # # print('getuserName: ', getuserName)
            for project in getproject:
                projectN = project.ProjectName
                projectChall = project.ProjectProblem_id
                getChall = BeahChallenge.objects.get(ID=projectChall)
                projectChallenge = getChall.Title
                projectDes = project.ProjectDescription
                projectproposal = str(project.ProjectProposal)
                # # print('projectproposal', projectproposal, type(projectproposal))
            for user in getuserName:
                userN = user.UserEmail
                userP = user.UserPassword
      
            # Allteams.append({'ID': id, 'TeamName': name, 'userN': userN, 'CollegeName': collegeName, 'ProjectName': projectN, 'phone': PhoneNum,
            #                 'ProjectDescription': projectDes, 'MemberNum': member, 'JoinDate': date, 'UserStatus': status, 'UserPassword': userP})

            allteams.append([n, name, userN, PhoneNum, collegeName, projectChallenge, projectN, projectDes, date, member, status])
            n = n + 1


        googlesheet_requests_data(allteams)


############################################

def get_service(api_name, api_version, scopes, key_file_location):
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)
    # Build the service object.
    service = build(api_name, api_version, credentials=credentials)
    return service


def get_first_profile_id(service):
    accounts = service.management().accounts().list().execute()
    if accounts.get('items'):
        # Get the first Google Analytics account.
        account = accounts.get('items')[0].get('id')
        # Get a list of all the properties for the first account.
        properties = service.management().webproperties().list(
                accountId=account).execute()
        if properties.get('items'):
            # Get the first property id.
            property = properties.get('items')[0].get('id')
            # Get a list of all views (profiles) for the first property.
            profiles = service.management().profiles().list(
                    accountId=account,
                    webPropertyId=property).execute()
            if profiles.get('items'):
                # return the first view (profile) id.
                return profiles.get('items')[0].get('id')
    return None


def get_results(service, profile_id):
    return service.data().ga().get(
            ids='ga:' + profile_id,
            start_date='2022-10-01',
            end_date='today',
            metrics='ga:users').execute()


def print_results(results):
    # Print data nicely for the user.
    if results:
        print ('View (Profile):', results.get('profileInfo').get('profileName'))
        print ('Total Sessions:', results.get('rows')[0][0])
    else:
        print ('No results found')

    return results.get('rows')[0][0]


# https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.a0Aa4xrXO1kDuSgvTiWDsq4tTivlr80M9f2YT4vliUBDTp4uMATNsAVool4R7MTQkRmBoV_-P5UCYMTVpCA94vXxQzqxEnjZ4ieVlkNGzsQJeL_baXE2Ni33kLnhNR3RKAmCcXG9VARu9eZQvjoQ49DV_1iF5cxt4aCgYKATASARESFQEjDvL9xj0TeylLAfwfmoNCJuiCtg0166&ids=ga%3A277973294&metrics=ga%3Ausers%2Cga%3AnewUsers%2Cga%3Asessions&start-date=2022-10-01&end-date=today
def getvisotors():
    # Define the auth scopes to request.
    scope = 'https://www.googleapis.com/auth/analytics.readonly'
    BASE_DIR = Path(__file__).resolve().parent
    key_file_location = str(BASE_DIR) + '/beah-tec-3a162d626126.json'

    # Authenticate and construct service.
    service = get_service(
            api_name='analytics',
            api_version='v3',
            scopes=[scope],
            key_file_location=key_file_location)

    profile_id = get_first_profile_id(service)
    visitors = print_results(get_results(service, profile_id))

    return visitors

def getvisotors_2():
    r = requests.get('https://www.googleapis.com/analytics/v3/data/ga?access_token=ya29.a0Aa4xrXO1kDuSgvTiWDsq4tTivlr80M9f2YT4vliUBDTp4uMATNsAVool4R7MTQkRmBoV_-P5UCYMTVpCA94vXxQzqxEnjZ4ieVlkNGzsQJeL_baXE2Ni33kLnhNR3RKAmCcXG9VARu9eZQvjoQ49DV_1iF5cxt4aCgYKATASARESFQEjDvL9xj0TeylLAfwfmoNCJuiCtg0166&ids=ga%3A277973294&metrics=ga%3Ausers%2Cga%3AnewUsers%2Cga%3Asessions&start-date=2022-10-01&end-date=today')
    if (r.status_code==200):
        data = r.json()
        visitors = data['rows'][0][0]
        return int(visitors)
############################################

def get_random_string():
    # choose from all lowercase letter
    letters = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters) for i in range(8))
    # # print("Random string ", result_str)
    return result_str


def encrypt(txt):
    # convert integer etc to string first
    txt = str(txt)
    # get the key from settings
    cipher_suite = Fernet(settings.ENCRYPT_KEY)  # key should be byte
    # #input should be byte, so convert the text to byte
    encrypted_text = cipher_suite.encrypt(txt.encode('ascii'))
    # encode to urlsafe base64 format
    encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii")
    return encrypted_text


def decrypt(txt):
    # base64 decode
    txt = base64.urlsafe_b64decode(txt)
    cipher_suite = Fernet(settings.ENCRYPT_KEY)
    decoded_text = cipher_suite.decrypt(txt).decode("ascii")
    return decoded_text

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
def checkifEmail(email):
    if(re.fullmatch(regex, email)):
        return 1
    else:return 0


def sendAlertEmail(dist_email):
    global EMAIL_ADDRESS, EMAIL_PASSWORD, mail_server, mail_port
    # EMAIL_ADDRESS = 'techbeah@gmail.com'
    # EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
    # EMAIL_ADDRESS = 'beah-tec@beah.om'
    # EMAIL_PASSWORD = 'beAh@2022!'
    msg = EmailMessage()

    if True:
        msg['To'] = dist_email
        msg['Subject'] = 'نداء عاجل'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">أهلا مسؤول بيئة تك</span>💫
                                  <br><br>
                                  نود إعلامك بأن جهاز المودم فيه مشكلة عدم الاستجابة .. يرجى احتواء المشكلة بشكل عاجل
                                  <br><br>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')
    
    msg['From'] = EMAIL_ADDRESS

    with smtplib.SMTP_SSL(mail_server, mail_port) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
        smtp.close()
    return True

def OTPEmail(dist_email, otp):
    global EMAIL_ADDRESS, EMAIL_PASSWORD, mail_server, mail_port
    # EMAIL_ADDRESS = 'techbeah@gmail.com'
    # EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
    # EMAIL_ADDRESS = 'beah-tec@beah.om'
    # EMAIL_PASSWORD = 'beAh@2022!'
    msg = EmailMessage()

    if True:
        msg['To'] = dist_email
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br>
                                  Your OTP for beah-tec : <span style="font-weight: 700;">{otp}</span>
                                  <br><br>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')
    
    msg['From'] = EMAIL_ADDRESS

    with smtplib.SMTP_SSL(mail_server, mail_port) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
        smtp.close()
    return True


# Send Email Function
def sendEmail(user, password, name, custmsg, subject, status, callFrom, projectChall="", college="", phone="", teamCount=0, projectName="", projectDesc=""):
    global EMAIL_ADDRESS, EMAIL_PASSWORD, mail_server, mail_port
    receivedMsg = custmsg
    # EMAIL_ADDRESS = 'techbeah@gmail.com'
    # EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
   
    msg = EmailMessage()

    if callFrom == 'alert':
        msg['To'] = EMAIL_ADDRESS
        msg['From'] = EMAIL_ADDRESS
        msg['Subject'] = 'نداء عاجل'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">أهلا مسؤول بيئة تك</span>💫
                                  <br><br>
                                  نود إعلامك بأن جهاز المودم فيه مشكلة عدم الاستجابة .. يرجى احتواء المشكلة بشكل عاجل
                                  <br><br>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'vote':
        rec = user
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                نود إعلامكم بتمديد مرحلة التصويت إلى نهاية يوم الخميس بتاريخ <span style="font-weight: 700;">2 مارس 2023</span>
                                  <br><br>
                                 رابط التصويت:
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/vote" target="_blank" >https://www.beah-tec.com/vote</a></span>
                                  <br><br>
                                  لمعرفة طريقة التصويت:
                                  <br>
                                   <span style="font-weight: 700;"><a href="https://www.beah-tec.com/video/beahtec-vote.mp4" target="_blank" >https://www.beah-tec.com/video/beahtec-vote.mp4</a></span>
                                  <br><br>
                                  بإمكانكم استخدام هاشتاقات البرنامج للوصول لشريحة أكبر:
                                  <br>
#بيئة_تك
<br>
#نكتشف_الإمكانات 
                                  <br><br>
                                  <p>حظا موفقا للجميع✨</p>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')
    
    if callFrom == 'Anounce':
        rec = user
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                شكراً لمشاركتكم في برنامج:
                                  <br>
                                  <span style="font-weight: 700;">بيئة تك</span>
                                  <br><br>
                                  هنا استبيان سريع لمعرفة انطباعكم حول البرنامج👇🏻
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://forms.gle/7T57WX3mJaGyTtaX7" target="_blank" >https://forms.gle/7T57WX3mJaGyTtaX7</a></span>
                                  <br><br>
                                  <span style="font-weight: 700;">ملاحظة 📝</span>
                                  <br>
                                  📌 ستصلكم شهادة المشاركة عبر الإيميل بعد تعبئة الاستبيان.
                                  <br>
                                  📌 يتم تعبئة الاستبيان بشكل منفرد لكل عضو في الفريق حسب الأعضاء المسجلين مسبقا في منصة بيئة تك للحصول على الشهادة.
                                  <br>
                                  📌 آخر موعد لتعبئة الاستبيان والحصول على الشهادة تاريخ <span style="font-weight: 700;">9 مارس 2023</span>
                                  <br><br>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    
    if callFrom == 'file':
        rec = user
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                  <span style="font-weight: 700;">ملاحظة مهمة</span>
                                  <br><br>
                                    يمكنكم تحميل نموذج عرض المشروع عبر الوصلة التالية:
                                   <br>
                                   https://beah-tec.com:80/static/Files/presentation.pptx
                                  <br><br>
                                  <p>حظا موفقا للجميع✨</p>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')



    if callFrom == 'NewTimeLine':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير</span>💫
                                  <br><br>
                                  نود إبلاغكم بأنه تم تعديل الخطة الزمنية للبرنامج حيث تم تمديد المرحلة الحالية (مرحلة تنفيذ المشاريع وتسليم ملف المشروع) إلى 
                                  <span style="font-weight: 700;">نهاية شهر ديسمبر ٢٠٢٢</span>
                                  <br>
                                  حتى يتسنى لكم العمل على أفكاركم ومشاريعكم الخاصة ببرنامج بيئة تك مع مراعاة فترات الدراسة والاختبارات.
                                  <br>
                                  <br>مزيد من التفاصيل عن الخطة الزمنية للبرنامج تجدونها عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/about" target="_blank" >https://www.beah-tec.com/about</a></span>
                                  <br>
                                  <p>طاب يومكم 🌿</p>

                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'All':
        rec_list = user
        rec = ', '.join(rec_list)
        msg['To'] = rec
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br><span style="font-weight: 700;">مرحبا بصناع التغيير </span>💫
                                  <br><br>
                                  نود إبلاغكم بتمديد تسليم ملف المشروع إلى يوم الأحد بتاريخ
                                  <br>
                                  <span style="font-weight: 700;">📆: 1 يناير 2023</span>
                                  <br>
                                  <span style="font-weight: 700;">⏰: 11:59 ليلاً  🌙</span>
                                  <br>
                                  <br>
                                  <br>يمكنكم الدخول للمنصة عبر الحساب التالي:
                                  <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                                  <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                                  <br>
                                  <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                                  <br>
                                  <br>مزيد من التفاصيل عن الخطة الزمنية للبرنامج تجدونها عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/about" target="_blank" >https://www.beah-tec.com/about</a></span>
                                  <br><br>
                                  <br>
                                  ولأي استفسارات أخرى تخطر على بالكم يرجى التواصل معنا مباشرة عبر: 
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                                  <br><br>
                                  <p>حظا موفقا للجميع✨</p>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'AllParticipate':
        rec_list = user
        rec = ', '.join(rec_list)
        msg['To'] = rec
        msg['Subject'] = subject
        msg.add_alternative(f"""<!DOCTYPE html>
    <html 
    </head>
     <link rel="stylesheet" href="https://beah-tec.com/assets/quill.snow.css" media="screen">
    </head>
    <body 
    <div style="font-weight:700;color:#26306a;text-align:right;font-size:16px">
    {custmsg}
    </div>
    </body></html>
                """, subtype='html')
        print('custmsg',custmsg)


    if callFrom == 'missing':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">
                                  <br>أهلا فريق <span style="font-weight: 700;">{name}</span>💫
                                  <br><br>
                                  <br>يمكنكم الدخول للمنصة عبر الحساب التالي:
                                  <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                                  <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                                  <br>
                                  <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                                  <br><br>
                                  ولأي استفسارات أخرى تخطر على بالكم يرجى التواصل معنا مباشرة عبر: 
                                  <br>
                                  <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                                  <br><br>
                                  <p>طاب يومكم 🌿</p>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
                        <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'proposal':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>يصلك هذا البريد لإعلامك بأنك قد قمت بتسليم مقترح مشروعك عبر منصة بيئة تك. ويمكنك إجراء أي تعديلات وإضافات قبل انتهاء مرحلة تنفيذ المشاريع بتاريخ <span style="font-weight: 700;">10 فبراير
2023</span>
<br>
                        <br>يمكنك الدخول للمنصة عبر الحساب التالي:<br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'proposaladmin':
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا مسؤول بيئة تك
                        <br>
                        <br>يصلك هذا البريد لإعلامك بأن فريق <span style="font-weight: 700;">{name}</span> قد قام بتسليم مقترح المشروع عبر منصة بيئة تك. 
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الحساب التالي:<br>اسم المستخدم: <span style="font-weight: 700;">{EMAIL_ADDRESS}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">Beah!2022</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'noaccount':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تقديم الأفكار في منصة بيئة تك
                        <br>
                        <br><span style="font-weight: 700;">ويؤسفنا إبلاغكم بأن فريقكم لم يتأهل للانتقال للمرحلة التالية.</span>
                        <br>
                        <br>نتطلع إلى مشاركتكم مرة أخرى في التحدي القادم ونتمنى لكم كل التوفيق والنجاح.
                        <br>
                        <br>لأي استفسارات بإمكانكم التواصل معنا عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'account':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تقديم الأفكار في منصة بيئة تك 
                        <br>
                        <br><span style="font-weight: 700;">يسعدنا إبلاغكم بأن فريقكم قد تأهل للمرحلة التالية !</span>
                        <br>
                        <br>وهكذا بدأت رحلتكم في مرحلة تنفيذ المشاريع والتي تستمر من الآن إلى تاريخ 3 ديسمبر 2022
                        <br>
                        <br>يمكنكم الدخول للمنصة لتعديل الأفكار ورفع البيانات والملفات المطلوبة عبر الحساب التالي:
                        <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'noteams12':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تنفيذ المشاريع وتسليم ملف المشروع في منصة بيئة تك
                        <br>
                        <br><span style="font-weight: 700;">ويؤسفنا إبلاغكم بأن فريقكم لم يتأهل للانتقال للمرحلة التالية.</span>
                        <br>
                        <br>نتطلع إلى مشاركتكم مرة أخرى في التحدي القادم ونتمنى لكم كل التوفيق والنجاح.
                        <br>
                        <br>لأي استفسارات بإمكانكم التواصل معنا عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/contact" target="_blank" >https://www.beah-tec.com/contact</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'teams12':
        msg['To'] = user
        msg['Subject'] = 'تحدي بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>انتهت فترة تنفيذ المشاريع وتسليم ملف المشروع في منصة بيئة تك 
                        <br>
                        <br><span style="font-weight: 700;">يسعدنا إبلاغكم بأن فريقكم قد تأهل للمرحلة التالية !</span>
                        <br>
                        <br>وهكذا تستمر رحلتكم في المرحلة الثانية والتي تستمر من الآن إلى تاريخ 11 فبراير 2023
                        <br>
                        <br>سيقوم فريق بيئة تك بالتواصل معكم لتقديم الدعم الفني خلال أيام هذا الأسبوع
                        <br>
                        <br>يمكنكم الدخول للمنصة <span style="font-weight: 700;">ابتداء من يوم الأحد القادم بتاريخ 15 يناير 2023</span> لرفع البيانات والملفات المطلوبة عبر الحساب التالي:
                        <br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                        <br>
                        <p>حظا موفقا للجميع✨</p>
                        <p>طاب يومكم 🌿</p>
                    </p>
                    <br><br>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>
                    </p>
                    </div>
                    <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
                </div>
                </div>
            </div>
            </div>
        
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'team':
        msg['To'] = user
        if status == 0:
            msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <h2 class="u-text u-text-default u-text-1">رسالة نتيجة القبول</h2>
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>لقد تم اختياركم للمنافسة في تحدي بيئة تك متمنين لكم كل التوفيق والنجاح<br>يمكنكم الدخول للمنصة عبر الحساب التالي:<br>اسم المستخدم: <span style="font-weight: 700;">{user}</span>
                        <br>كلمة المرور: <span style="font-weight: 700;">{password}</span>
                        <br>
                        <br>يمكنك الدخول للمنصة عبر الوصلة التالية:<br>
                        <span style="font-weight: 700;"><a href="https://www.beah-tec.com/login" target="_blank" >https://www.beah-tec.com/login</a></span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>شركة بيئة
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <img class="u-image u-image-contain u-image-default u-preserve-proportions u-image-1" src="https://beah-tec.com/image/beahlogo.png" alt="" data-image-width="618" data-image-height="321">
        </div>
        </section>
    
    </body></html>
                """, subtype='html')
            # message = f'Your request accepted and your username is {user} and password {password}'
            msg['Subject'] = 'نتيجة القبول | بيئة تك'
        else:
            msg['Subject'] = 'نتيجة القبول | بيئة تك'
            msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">،{user} هلا</p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!لم تتم الموافقة</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 .هذه الرسالة من فريق بيئة تك لإعلامك بأنه لم تتم الموافقة على طلبك ٬متمنين لكم حظا أوفراً في الفعاليات القادمة
                 </p><br>
            </body>
            </html>
            """, subtype='html')

    if callFrom == 'request':
        msg['To'] = user
        msg['Subject'] = 'استقبال الفكرة | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <h2 class="u-text u-text-default u-text-1">استقبال الفكرة</h2>
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>.هذه الرسالة من فريق بيئة تك لإعلامك بأنه تم استقبال طلبك بنجاح وسيتم مراجعتها من قِبل الفريق ويتم إشعاركم بالمرحلة التالية لاحقا<br>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>شركة بيئة
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <img class="u-image u-image-contain u-image-default u-preserve-proportions u-image-1" src="https://beah-tec.com/image/beahlogo.png" alt="" data-image-width="618" data-image-height="321">
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'request3':
        msg['To'] = user
        msg['Subject'] = 'استقبال الفكرة | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
                <html style="font-size: 16px;" lang="en"><head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://beah-tec.com/assets/page.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/site.css" media="screen">
    <link rel="stylesheet" href="https://beah-tec.com/assets/Home.css" media="screen">
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/jquery-3.5.1.min.js" defer=""></script>
        <script class="u-script" type="text/javascript" src="https://beah-tec.com/assets/page.js" defer=""></script>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
        
        <meta name="theme-color" content="#478ac9">
        <meta property="og:title" content="Home">
        <meta property="og:type" content="website">
        <link rel="canonical" href="/">
    </head>
    <body data-home-page-title="Home" class="u-body u-xl-mode" data-lang="en"><header class="u-clearfix u-header u-header" id="sec-152a"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <a href="" class="u-image u-logo u-image-1" data-image-width="149" data-image-height="116">
            <img src="https://beah-tec.com/image/beahTecLogo.png" class="u-logo-image u-logo-image-1">
            </a>
        </div></header>
        <section class="u-clearfix u-section-1" id="sec-8c62">
        <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-container-layout-2">
                    <h2 class="u-text u-text-default u-text-1">استقبال الفكرة</h2>
                    <p class="u-align-right u-text u-text-2">&nbsp; أهلا فريق <span style="font-weight: 700;">{name}</span>
                        <br>
                        <br>.هذه الرسالة من فريق بيئة تك لإعلامك بأنه تم استقبال طلبك بنجاح وسيتم مراجعتها من قِبل الفريق ويتم إشعاركم بالمرحلة التالية لاحقا<br>
                        <br>تفاصيل الفكرة
                        <br>التحدي : <span style="font-weight: 700;">{projectChall}</span>
                        <br>اسم الفريق : <span style="font-weight: 700;">{name}</span>
                        <br>اسم الكلية : <span style="font-weight: 700;">{college}</span>
                        <br>رقم الهاتف : <span style="font-weight: 700;">{phone}</span>
                        <br>عدد أعضاء الفريق : <span style="font-weight: 700;">{teamCount}</span>
                        <br>اسم المشروع : <span style="font-weight: 700;">{projectName}</span>
                        <br>وصف المشروع : <span style="font-weight: 700;">{projectDesc}</span>
                        <br>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
        <section class="u-clearfix u-section-2" id="sec-d9c6">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
                <div class="u-layout-row">
                <div class="u-align-center u-container-style u-layout-cell u-left-cell u-size-23 u-layout-cell-1">
                    <div class="u-container-layout u-container-layout-1"></div>
                </div>
                <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-37 u-layout-cell-2" dir="rtl">
                    <div class="u-container-layout u-valign-top u-container-layout-2" dir="rtl">
                    <p class="u-align-right u-text u-text-1">تحياتنا العطرة ،،،<br>فريق بيئة تك<br>شركة بيئة
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <img class="u-image u-image-contain u-image-default u-preserve-proportions u-image-1" src="https://beah-tec.com/image/beahlogo.png" alt="" data-image-width="618" data-image-height="321">
        </div>
        </section>
    
    </body></html>
                """, subtype='html')

    if callFrom == 'request2':
        msg['To'] = user
        msg['Subject'] = 'استقبال الطلب | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"> {name} أهلا فريق </p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!تم استقبال طلبك</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 .هذه الرسالة من فريق بيئة تك لإعلامك بأنه تم استقبال طلبك بنجاح وسيتم مراجعتها من قِبل الفريق يتم إشعاركم بنتيجة القبول لاحقا
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'contact':
        msg = msg
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = 'رسالة تواصل | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!رسالة</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 <br>
                 :لقد تم إرسال رسالة من الموقع تفاصيلها<br>
                 {name} :المرسل<br>
                 {user} :البريد الإلكتروني<br>
                        :محتوى الرسالة<br>
                 {receivedMsg}<br>
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'join':
        msg['To'] = EMAIL_ADDRESS
        # message = f'You Recieve a new Join Request Please Check Admin Dashboard'
        # msg['Subject'] = 'Beah Tec Join Request'
        msg['Subject'] = ' طلب جديد | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!طلب جديد</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                .لقد تم استقبال طلب جديد يرجى تسجيل الدخول للمنصة ومتابعة تفاصيلها
                 </p><br>
            </body>
            </html>
            """, subtype='html')
    if callFrom == 'registerteam':
        msg['To'] = user
        # message = f'You are register in beah tec \n your email is {user}\n and your password is {password}'
        # msg['Subject'] = 'Beah Tec Join Request'

        msg['Subject'] = ' مستخدم جديد | بيئة تك'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">!مستخدم جديد</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"><br>
                لقد تم إضافتك في منصة بيئة تك كمستخدم مسؤول لمتابعة المنصة<br>
                 {user} :اسم المستخدم<br>
                 {password} :كلمة المرور<br>
                 https://www.beah-tec.com :رابط المنصة<br>
                 </p><br>
            </body>
            </html>
            """, subtype='html')

    if callFrom == 'emailAll':
        # print('emailAll user', user)
        rec_list = user
        rec = ', '.join(rec_list)
        # print('emailAll rec', rec)
        msg['To'] = rec
        message = receivedMsg
        # # print('emailAll message', message)
        msg['Subject'] = subject
    if callFrom == 'admin':
        msg['To'] = user
        message = f'Your are admin of Beah Tech. your username is {user} and password {password}'
        msg['Subject'] = 'Beah Tech Admin'
    if callFrom == "Send":
        msg['To'] = user
        message = receivedMsg
        msg['Subject'] = "رسالة | بيئة تك"
    if callFrom == 'Rcode':
        msg['To'] = user
        message = f'activation code for reset password {receivedMsg}'
        msg.add_alternative(f"""<!DOCTYPE html>
            <html lang="en" dir="rtl">
            <head>
                <meta charset="utf-8">
                <title></title>
            </head>
            <body>
                <img src='https://beah-tec.com/image/beahTecLogo.png'/>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
                <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">رمز التفعيل!</p><br>
                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
                 هذه الرسالة من فريق بيئة تك لإعطائك رمز التفعيل
                 يرجي عدم مشاركته للآخرين
                 <br>
                 code: {receivedMsg}
                 </p><br>
            </body>
            </html>
            """, subtype='html')
        msg['Subject'] = "رمز التفعيل | بيئة تك"
    
    msg['From'] = EMAIL_ADDRESS

    # with smtplib.SMTP(mail_server, mail_port) as smtp:
    #     smtp.starttls()
    #     smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    #     smtp.send_message(msg)
    #     smtp.close()

    try:
        with smtplib.SMTP_SSL(mail_server, mail_port) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            smtp.close()
    except: pass
    
    return True


# def sendEmail(user, password, name, custmsg, subject, status, callFrom):
#     global EMAIL_ADDRESS, EMAIL_PASSWORD, mail_server, mail_port
#     # # print('send Email Call', user, name, custmsg, callFrom)
#     receivedMsg = custmsg
#     # # print('receivedMsg', receivedMsg)
#     # EMAIL_ADDRESS = 'techbeah@gmail.com'
#     # EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
#     msg = EmailMessage()
#     if callFrom == 'team':
#         msg['To'] = user
#         if status == 0:
#             msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"> أهلا {name}٬ </p><br>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">تمت الموافقة!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                  هذه الرسالة من فريق بيئة تك لإعلامك بأنه تمت الموافقة على طلبك.
#                  اسم المستخدم: {user} 

#                  كلمة المرور: {password}
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#             # message = f'Your request accepted and your username is {user} and password {password}'
#             msg['Subject'] = 'نتيجة القبول | بيئة تك'
#         else:
#             msg['Subject'] = 'نتيجة القبول | بيئة تك'
#             msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">لم تتم الموافقة!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                  هذه الرسالة من فريق بيئة تك لإعلامك بأنه لم تتم الموافقة على طلبك ٬متمنين لكم حظا أوفراً في الفعاليات القادمة.
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')

#     if callFrom == 'request':
#         msg['To'] = user
#         msg['Subject'] = 'استقبال الطلب | بيئة تك'
#         msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px"> أهلا {name} </p><br>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">تم استقبال طلبك!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                  هذه الرسالة من فريق بيئة تك لإعلامك بأنه تم استقبال طلبك بنجاح وسيتم مراجعتها من قِبل الفريق يتم إشعاركم في حال القبول أو عدمه.
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#     if callFrom == 'contact':
#         msg = msg
#         msg['To'] = EMAIL_ADDRESS
#         msg['Subject'] = 'رسالة تواصل | بيئة تك'
#         msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">رسالة!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                 لقد تم إرسال رسالة تفاصيلها:
#                 المرسل: {name}
#                 البريد الإلكتروني: {user}
#                 محتوى الرسالة:
#                 {receivedMsg}
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#     if callFrom == 'join':
#         msg['To'] = EMAIL_ADDRESS
#         # message = f'You Recieve a new Join Request Please Check Admin Dashboard'
#         # msg['Subject'] = 'Beah Tec Join Request'
#         msg['Subject'] = ' طلب جديد | بيئة تك'
#         msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">طلب جديد!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                 لقد تم استقبال طلب جديد يرجى تسجيل الدخول للمنصة ومتابعة تفاصيلها.
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#     if callFrom == 'registerteam':
#         msg['To'] = user
#         # message = f'You are register in beah tec \n your email is {user}\n and your password is {password}'
#         # msg['Subject'] = 'Beah Tec Join Request'

#         msg['Subject'] = ' مستخدم جديد | بيئة تك'
#         msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">مستخدم جديد!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                 لقد تم إضافتك في منصة بيئة تك كمستخدم مسؤول لمتابعة المنصة.\n
#                 اسم المستخدم: {user}\n
#                 كلمة المرور: {password}\n
#                 رابط المنصة: https://beah-tec.com
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')

#     if callFrom == 'emailAll':
#         # print('emailAll user', user)
#         rec_list = user
#         rec = ', '.join(rec_list)
#         # print('emailAll rec', rec)
#         msg['To'] = rec
#         message = receivedMsg
#         # # print('emailAll message', message)
#         msg['Subject'] = subject
#     if callFrom == 'admin':
#         msg['To'] = user
#         message = f'Your are admin of Beah Tech. your username is {user} and password {password}'
#         msg['Subject'] = 'Beah Tech Admin'
#     if callFrom == "Send":
#         msg['To'] = user
#         message = receivedMsg
#         msg['Subject'] = "رسالة | بيئة تك"
#     if callFrom == 'Rcode':
#         msg['To'] = user
#         message = f'activation code for reset password {receivedMsg}'
#         msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='https://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">رمز التفعيل!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                  هذه الرسالة من فريق بيئة تك لإعطائك رمز التفعيل : {receivedMsg}
#                  يرجي عدم مشاركته للآخرين
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#         msg['Subject'] = "رمز التفعيل | بيئة تك"
    
#     msg['From'] = EMAIL_ADDRESS

#     with smtplib.SMTP_SSL(mail_server, mail_port) as smtp:
#         smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         smtp.send_message(msg)
#         smtp.close()
#     # call successMessage function
#     # # print("Email sent successfully!")
#     return True

# Send Email Function
# def sendEmail2(user, password, name, custmsg, subject, status, callFrom):
#     # # print('send Email Call', user, name, custmsg, callFrom)
#     receivedMsg = custmsg
#     # # print('receivedMsg', receivedMsg)
#     EMAIL_ADDRESS = 'techbeah@gmail.com'
#     EMAIL_PASSWORD = 'jsqxghkxazbcnbse'
#     msg = EmailMessage()
#     if callFrom == 'team':
#         msg['To'] = user
#         if status == 0:
#             msg.add_alternative(f"""<!DOCTYPE html>
#             <html lang="en" dir="rtl">
#             <head>
#                 <meta charset="utf-8">
#                 <title></title>
#             </head>
#             <body>
#                 <img src='http://beah-tec.com/image/beahTecLogo.png'/>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">Hey  {user},</p><br>
#                 <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">ATTENTION!</p><br>
#                  <p style="color:#3b3f44;text-align:left;font-family:verdana;font-size: 16px">
#                  This email from beah tec team to inform you that 
#                  your request accepted and your username is {user} and password {password}.
#                  </p><br>
#             </body>
#             </html>
#             """, subtype='html')
#             # message = f'Your request accepted and your username is {user} and password {password}'
#             msg['Subject'] = 'Beah Tech Project!Approved'
#         else:
#             message = f'Beah Tech Project!Not Approved'
#             msg['Subject'] = 'Beah Tech Project!Not Approved'
#     if callFrom == 'contact':
#         msg = msg
#         msg['To'] = EMAIL_ADDRESS
#         message = f'this is message from {name} \n email address {user} \n and he send {receivedMsg}'
#         msg['Subject'] = 'Message from website Contact Form'
#     if callFrom == 'join':
#         msg['To'] = EMAIL_ADDRESS
#         message = f'You Recieve a new Join Request Please Check Admin Dashboard'
#         msg['Subject'] = 'Beah Tec Join Request'
#     if callFrom == 'registerteam':
#         msg['To'] = user
#         message = f'You are register in beah tec \n your email is {user}\n and your password is {password}'
#         msg['Subject'] = 'Beah Tec Join Request'
#     if callFrom == 'emailAll':
#         # print('emailAll user', user)
#         rec_list = user
#         rec = ', '.join(rec_list)
#         # print('emailAll rec', rec)
#         msg['To'] = rec
#         message = receivedMsg
#         # # print('emailAll message', message)
#         msg['Subject'] = subject
#     if callFrom == 'admin':
#         msg['To'] = user
#         message = f'Your are admin of Beah Tech. your username is {user} and password {password}'
#         msg['Subject'] = 'Beah Tech Admin'
#     if callFrom == "Send":
#         msg['To'] = user
#         message = receivedMsg
#         msg['Subject'] = "message from bech tec"
#     if callFrom == 'Rcode':
#         msg['To'] = user
#         message = f'activation code for reset password {receivedMsg}'
#         msg['Subject'] = "activation code"
#     msg['From'] = EMAIL_ADDRESS
#     msg.set_content(message)

#     with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#         smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         smtp.send_message(msg)
#         smtp.close()
#     # call successMessage function
#     # # print("Email sent successfully!")
#     return True


@api_view(['GET'])
def hackathon_images(request):
    BASE_DIR = Path(__file__).resolve().parent.parent
    if request.method == 'GET':
        dir_name = str(BASE_DIR) + "/media/Hackathon/"
        # dir_list = os.listdir(dir_name)
        dir_list = sorted( filter( lambda x: os.path.isfile(os.path.join(dir_name, x)), os.listdir(dir_name) ) )
        url = 'Hackathon/'
        images_list = []
        for f in dir_list:
            images_list.append(url + f)
        
        print(images_list)
        data = {'images': images_list}
        return JsonResponse(data, safe=False)


@api_view(['GET'])
def workshops_images(request):
    BASE_DIR = Path(__file__).resolve().parent.parent
    if request.method == 'GET':
        dir_name = str(BASE_DIR) + "/media/Workshops/"
        # dir_list = os.listdir(dir_name)
        dir_list = sorted( filter( lambda x: os.path.isfile(os.path.join(dir_name, x)), os.listdir(dir_name) ) )
        url = 'Workshops/'
        images_list = []
        for f in dir_list:
            images_list.append(url + f)
        
        print(images_list)
        data = {'images': images_list}
        return JsonResponse(data, safe=False)


@api_view(['POST'])
def visitorRegister(request):
    if request.method == 'POST':
        email = request.data['regemail']
        passw = request.data['regpassword']
        passcw = request.data['regconfpassword']
        # # print('regemail', email)
        checkvisitor = BeahVisitors.objects.filter(UserEmail=email).exists()
        if checkvisitor:
            getkvisitor = BeahVisitors.objects.get(UserEmail=email)
            if getkvisitor.IsActive == 0:
                if passw == passcw:
                    pass_enc = encrypt(passw)
                    getkvisitor.UserPassword=pass_enc
                    getkvisitor.save()
                    genCode = get_random_string()
                    checkCode = BeahRandomCode.objects.filter(visitorID=getkvisitor).exists()
                    if checkCode:
                        getCode = BeahRandomCode.objects.get(visitorID=getkvisitor)
                        getCode.randomCode = genCode
                        getCode.Date=datetime.now()
                        getCode.save()
                        sendEmail(user=email, password="", name="",
                            subject="", custmsg=genCode, status="", callFrom="Rcode")
                    return http.HttpResponse('updated')
                else:
                    return http.HttpResponse('password')
                    
            else:
                return http.HttpResponse('exit')
        else:
            if passw == passcw:
                # encoding password
                pass_enc = encrypt(passw)
                Store_in_VisitorTable = BeahVisitors(
                    UserEmail=email, UserPassword=pass_enc)
                Store_in_VisitorTable.save()
                obj = BeahVisitors.objects.latest('ID')
                genCode = get_random_string()
                Store_in_BeahRandomCode = BeahRandomCode(
                    visitorID=obj, randomCode=genCode, Date=datetime.now())
                Store_in_BeahRandomCode.save()
                sendEmail(user=email, password="", name="",
                          subject="", custmsg=genCode, status="", callFrom="Rcode")
                return http.HttpResponse('visitor')
            else:
                return http.HttpResponse('password')


@api_view(['POST'])
def ResendCodetovisitor(request):
    if request.method == 'POST':
        email = request.data['regemail']
        # # print('ResendCodetovisitor', email)
        checkEmail = BeahVisitors.objects.get(UserEmail=email)
        if checkEmail:
            checkCode = BeahRandomCode.objects.get(visitorID=checkEmail)
        if checkCode:
            randomCode = get_random_string()
            checkCode.randomCode = randomCode
            checkCode.Date = datetime.now()
            checkCode.save()
            sendEmail(user=email, password="", name="",
                      subject="", custmsg=randomCode, status="", callFrom="Rcode")
            return http.HttpResponse('send')


@api_view(['POST'])
def checkCorrectVisitorCode(request):
    if request.method == 'POST':
        currenttime = datetime.now()
        email = request.data['regemail']
        code = request.data['code']
        checkEmail = BeahVisitors.objects.get(UserEmail=email)
        if checkEmail:
            checkCode = BeahRandomCode.objects.get(visitorID=checkEmail)
            if checkCode:
                if code == checkCode.randomCode:
                    codedate = checkCode.Date
                    duration = currenttime - codedate
                    minutes = duration.total_seconds() / 60.0
                    # # print('minutes', minutes)
                    if minutes > 5:
                        return http.HttpResponse('expired')
                    else:
                        checkEmail.IsActive =1
                        checkEmail.save()
                        return http.HttpResponse('success')
                else:
                    return http.HttpResponse('wrongCode')


@api_view(['POST'])
def join(request):
    if request.method == 'POST':
        info = request.data
        password = get_random_string()
        # # print('password from join', password)
        # encoding password
        pass_enc = encrypt(password)
        # pass_enc = make_password(password)
        # # print('pass_enc', pass_enc)
        # # print('info', info)
    # get college instance
        IsnewCollege = False
        newCollege = ""
        if (info['college']):
            if (info['college'].isdigit()):
                IsnewCollege = False
                collegeID = BeahTecCollege.objects.get(ID=info['college'])
                # newCollege = collegeID.CollegeName
            else:
                IsnewCollege = True
                newCollege = info['college']
                if ( 'اسم الكلية' in newCollege or newCollege=='أخرى' or str(newCollege)=='18'):
                    res = "college"
                    return http.HttpResponse(res)

                # check if exist
                college_exist = BeahTecCollege.objects.filter(CollegeName=newCollege).exists()
                
                if (not college_exist):
                    # add new college
                    newC = BeahTecCollege(CollegeName=newCollege, Main=False)
                    newC.save()
                    collegeID = newC
                else:
                    collegeID = BeahTecCollege.objects.filter(CollegeName=newCollege)[0]

        # collegeID = BeahTecCollege.objects.get(ID=info['college'])

    # get challenge instance
        challengeID = BeahChallenge.objects.get(ID=info['problem'])
    # check if email taken from user exit or not
        email = info['email']
        phone = info['phone']
        team  = info['team']

        team_exist  = False
        phone_exist = False
        email_exist = False

        # check
        if BeahTeam.objects.filter(TeamName=team).exists():
            team_exist = True

        if BeahTeam.objects.filter(PhoneNum=phone).exists():
            phone_exist = True

        if BeahUsers.objects.filter(UserEmail=email).exists():
            email_exist = True

        if (team_exist or phone_exist or email_exist):
            res = ""
            if (team_exist): res += "T"
            if (phone_exist): res += "P"
            if (email_exist): res += "E"
            return http.HttpResponse(res)

        if (int(info['member'])<3 or int(info['member'])>5):
            return http.HttpResponse("outofmembers")

        Store_in_UserTable = BeahUsers(
                UserEmail=email, UserPassword=pass_enc, UserType=1)
        Store_in_UserTable.save()
            # Save data in team Table
            # newCollege
        Store_in_TeamTable = BeahTeam(
                TeamID=Store_in_UserTable, MemberNum=info['member'], TeamName=info['team'], CollegeName=collegeID, PhoneNum=info['phone'], UserStatus=1)
        # Store_in_TeamTable = BeahTeam(
        #         TeamID=Store_in_UserTable, MemberNum=info['member'], TeamName=info['team'], CollegeName=newCollege, PhoneNum=info['phone'], UserStatus=1)
        Store_in_TeamTable.save()
            # Save data in project Table
        Store_in_ProjectTable = BeahProjects(
                TeamID=Store_in_TeamTable, ProjectProblem=challengeID, ProjectName=info['project'], ProjectDescription=info['description'])
        
        Store_in_ProjectTable.save()

        sendEmail(user="", password="", name="",
                      subject="", custmsg="", status="", callFrom="join")
            # sendEmail(user=email,  password=password, name="",  subject="", msg="", status="", callFrom="registerteam")
        saveAdminNotifications(info['team'])

        #  projectChall="", college="", phone="", teamCount=0, projectName="", projectDesc=""
        sendEmail(user=email, password="", name=info['team'], custmsg="",
                      subject="", status="", callFrom="request3", projectChall=challengeID.Title, college=collegeID.CollegeName, phone=info['phone'], teamCount=info['member'], projectName=info['project'], projectDesc=info['description'])

        # sendEmail(user=email, password="", name=info['team'], custmsg="",
        #               subject="", status="", callFrom="request")

        # save to google sheet
        put_requests_data_google_sheet()

        return http.HttpResponse('join')
        

        # if not BeahUsers.objects.filter(UserEmail=email).exists():
        #     # Save data in User Table
        #     Store_in_UserTable = BeahUsers(
        #         UserEmail=email, UserPassword=pass_enc, UserType=1)
        #     Store_in_UserTable.save()
        #     # Save data in team Table
        #     Store_in_TeamTable = BeahTeam(
        #         TeamID=Store_in_UserTable, MemberNum=info['member'], TeamName=info['team'], CollegeName=collegeID, PhoneNum=info['phone'], UserStatus=1)
        #     Store_in_TeamTable.save()
        #     # Save data in project Table
        #     Store_in_ProjectTable = BeahProjects(
        #         TeamID=Store_in_TeamTable, ProjectProblem=challengeID, ProjectName=info['project'], ProjectDescription=info['description'])
        #     Store_in_ProjectTable.save()
        #     sendEmail(user="", password="", name="",
        #               subject="", custmsg="", status="", callFrom="join")
        #     # sendEmail(user=email,  password=password, name="",  subject="", msg="", status="", callFrom="registerteam")
        #     saveAdminNotifications(info['team'])
        #     return http.HttpResponse('join')

        # else:
        #     return http.HttpResponse('Email')


@api_view(['POST'])
def login(request):
    print("login page")

    if request.method == 'POST':
        login_info = request.data
        email = login_info['email']
        # # print('login_info',login_info)
        password = login_info['password']
        
        check_if_exit = BeahUsers.objects.filter(UserEmail=email).exists()
        # # print('check_if_exit', check_if_exit)
        if check_if_exit == True:
            # get data from user model
            getValues = BeahUsers.objects.get(UserEmail=email)
            getPassword = getValues.UserPassword
            getID = getValues.ID
            # # print('getPassword', getPassword)
            decpassword = decrypt(getPassword)
            # # print('decpassword', decpassword)
            if password == decpassword:
                getrRule = getValues.UserType
                # # print('getrRule', getrRule)
                if getrRule == 0:
                    return http.HttpResponse('admin')
                if getrRule == 1:
                    # Get data from team  model
                    getTeamValues = BeahTeam.objects.get(TeamID=getID)
                    getStatus = getTeamValues.UserStatus
                    # # print('getStatus', getStatus)

                    #### for test
                    if (email=="supermind92@gmail.com"):
                        return http.HttpResponse('team12')


                    #############################

                    timezone = pytz.timezone("Asia/Muscat") 
                    dateti = datetime.now(timezone)
                    y = dateti.year
                    m = dateti.month
                    d = dateti.day
                    print(y , " - " , m , " - ", d)
                    # if (y>=2023 and m>=1):
                    #     if getStatus == 0:
                    #         return http.HttpResponse('team12')
                    #     else:
                    #         return http.HttpResponse('NotApproved')
                    # elif (y>=2023 and m>=1 and d>1):
                    #         return http.HttpResponse('waiting')
                    # else:
                    #     return http.HttpResponse('team')

                    if getStatus == 0:
                        return http.HttpResponse('waiting')
                    else:
                        return http.HttpResponse('NotApproved')
                    
                    # return http.HttpResponse('team')

                    # if getStatus == 0:
                    #     return http.HttpResponse('team')
                    # if getStatus == 1:
                    #     return http.HttpResponse('NotApproved')
                # # print('login')
            else:
                return http.HttpResponse('password')
        else:
            check_if_visitor = BeahVisitors.objects.filter(
                UserEmail=email).exists()
            # # print('check_if_visitor', check_if_visitor)
            if check_if_visitor:
                getVisitorValues = BeahVisitors.objects.get(UserEmail=email)
                getVisitorPassword = getVisitorValues.UserPassword
                decVisitorpassword = decrypt(getVisitorPassword)
                # # print('decVisitorpassword', decVisitorpassword)
                if password == decVisitorpassword:
                    if getVisitorValues.IsActive == 1:
                        return http.HttpResponse('visitor')
                    else:return http.HttpResponse('notComplete')
                else:
                    return http.HttpResponse('password')
            else:
                user=''
                checkAdminUser =''
                username=''
                checkInput = checkifEmail(email)
                # # print('checkInput',checkInput)
                if checkInput==1:
                # check admin
                    try:
                        user = User.objects.filter(email=email).first()
                        # # print('check admin user with email',user)
                        if user is not None:
                            username = user.username
                            # # print('username',username)
                            checkAdminUser = authenticate(username=username,password=password)
                            # # print('check admin user with email',checkAdminUser)
                            # if checkAdminUser is not None:
                            #     res ='django' + email
                            #     return http.HttpResponse(res)
                    except:
                        pass
                else :
                        username=email
                        # # print('username',username)
                        checkAdminUser = authenticate(username=username,password=password)
                        # # print('checkAdminUser',checkAdminUser)
                        # djangoUser= User.objects.get(username=email)
                        # userDjangoEmail =djangoUser.email
                        # # print('check admin user with username',checkAdminUser)
                        # if checkAdminUser is not None:
                        #     res ='django' + userDjangoEmail
                        #     return http.HttpResponse(res)
                
        
                if checkAdminUser is not None:
                   
                    # login(request, user)
                    try:
                        djangoUser= User.objects.get(username=username)
                        userDjangoEmail =djangoUser.email
                        userDjangopassword =djangoUser.password
                        djenc = make_password(userDjangopassword)
                        # # print('userDjangoEmail',userDjangoEmail,'userDjangopassword',userDjangopassword,'djenc',djenc)
                        res ='django' + userDjangoEmail
                        return http.HttpResponse(res)
                    except:pass
                    # try:
                    #     getAminValues = BeahUsers.objects.get(UserEmail=userDjangoEmail)
                    # except:pass
                    # if getAminValues:
                    #      # print('login getAminValues',getAminValues)
                    #      res ='django' + userDjangoEmail
                    #      # print('res',type(res))
                    #      return http.HttpResponse(res)
                    # else:
                    #     Store_in_userTable = BeahUsers(
                    #     UserEmail=userDjangoEmail, UserType=0,UserPassword=userDjangopassword)
                    #     Store_in_userTable.save()
                    #     res ='django' + userDjangoEmail
                    #     return http.HttpResponse(res)
                else:
                    return http.HttpResponse('user')
        # # print('login_info', login_info)
    return http.HttpResponse('done')

@api_view(['GET'])
def getUserfromDjango(request):
     if request.method == 'GET':
        login_info = request.data
        email = login_info['email']              
        djangoUser= User.objects.get(username=user)
        userDjangoEmail =djangoUser.email
        userDjangopassword =djangoUser.password
        # # print('userDjangoEmail',userDjangoEmail)
        return http.HttpResponse(userDjangoEmail)


@api_view(['GET'])
def teams_(request):
    Allteams = []
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(UserStatus=0)
        for team in teams:
            memb = BeahMember.objects.filter(TeamID=team)
            member = len(memb)
            if (member>0):
                id = team.TeamID_id
                name = team.TeamName
                college = team.CollegeName_id
                PhoneNum = team.PhoneNum
                collegeID = BeahTecCollege.objects.get(ID=college)
                collegeName = collegeID.CollegeName
                date = team.JoinDate.strftime("%d-%m-%Y")
                if team.UserStatus == 1:
                    status = 'غير معتمد'
                else:
                    status = 'معتمد'
                getproject = BeahProjects.objects.filter(TeamID=team)
                getuserName = BeahUsers.objects.filter(ID=id)

                for project in getproject:
                    projectN = project.ProjectName
                    projectDes = project.ProjectDescription
                    if ('media/' not in str(project.ProjectProposal) and str(project.ProjectProposal)!=""):  projectproposal = 'media/' + str(project.ProjectProposal)
                    else: projectproposal = str(project.ProjectProposal)
                for user in getuserName:
                    userN = user.UserEmail
                    userP = user.UserPassword

                Allteams.append({'ID': id, 'TeamName': name, 'userN': userN, 'CollegeName': collegeName, 'ProjectName': projectN, 'phone': PhoneNum,
                                'ProjectDescription': projectDes, 'MemberNum': member, 'JoinDate': date, 'UserStatus': status, 'UserPassword': userP})

        # put_requests_data_google_sheet()
        return JsonResponse(list(Allteams), safe=False)

@api_view(['GET'])
def teams(request):
    Allteams = []
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(selected=1)
        for team in teams:
            memb = BeahMember.objects.filter(TeamID=team)
            member = len(memb)
            if (member>0):
                id = team.TeamID_id
                name = team.TeamName
                college = team.CollegeName_id
                PhoneNum = team.PhoneNum
                collegeID = BeahTecCollege.objects.get(ID=college)
                collegeName = collegeID.CollegeName
                date = team.JoinDate.strftime("%d-%m-%Y")
                if team.UserStatus == 1:
                    status = 'غير معتمد'
                else:
                    status = 'معتمد'
                getproject = BeahProjects.objects.filter(TeamID=team)
                getuserName = BeahUsers.objects.filter(ID=id)

                for project in getproject:
                    projectN = project.ProjectName
                    projectDes = project.ProjectDescription
                    if ('media/' not in str(project.ProjectProposal) and str(project.ProjectProposal)!=""):  projectproposal = 'media/' + str(project.ProjectProposal)
                    else: projectproposal = str(project.ProjectProposal)
                for user in getuserName:
                    userN = user.UserEmail
                    userP = user.UserPassword

                Allteams.append({'ID': id, 'TeamName': name, 'userN': userN, 'CollegeName': collegeName, 'ProjectName': projectN, 'phone': PhoneNum,
                                'ProjectDescription': projectDes, 'MemberNum': member, 'JoinDate': date, 'UserStatus': status, 'UserPassword': userP})

        for team in teams:
            memb = BeahMember.objects.filter(TeamID=team)
            member = len(memb)
            if (member==0):
                id = team.TeamID_id
                name = team.TeamName
                college = team.CollegeName_id
                PhoneNum = team.PhoneNum
                collegeID = BeahTecCollege.objects.get(ID=college)
                collegeName = collegeID.CollegeName
                date = team.JoinDate.strftime("%d-%m-%Y")
                if team.UserStatus == 1:
                    status = 'غير معتمد'
                else:
                    status = 'معتمد'
                getproject = BeahProjects.objects.filter(TeamID=team)
                getuserName = BeahUsers.objects.filter(ID=id)

                memb = BeahMember.objects.filter(TeamID=team)
                member = len(memb)

                for project in getproject:
                    projectN = project.ProjectName
                    projectDes = project.ProjectDescription
                    if ('media/' not in str(project.ProjectProposal) and str(project.ProjectProposal)!=""):  projectproposal = 'media/' + str(project.ProjectProposal)
                    else: projectproposal = str(project.ProjectProposal)
                for user in getuserName:
                    userN = user.UserEmail
                    userP = user.UserPassword

                Allteams.append({'ID': id, 'TeamName': name, 'userN': userN, 'CollegeName': collegeName, 'ProjectName': projectN, 'phone': PhoneNum,
                                'ProjectDescription': projectDes, 'MemberNum': member, 'JoinDate': date, 'UserStatus': status, 'UserPassword': userP})


        # put_requests_data_google_sheet()
        return JsonResponse(list(Allteams), safe=False)


import json

@api_view(['POST'])
def accountAll(request):
    if request.method == 'POST':
        data = request.data
        email = data['email']
        role = data['role']
        accounts_str = data['accounts']
        accounts = json.loads(accounts_str)
        accounts_count = len(accounts)
        getadmin = BeahUsers.objects.get(UserEmail=email)
        if (role=="admin" and getadmin.UserType==0 and accounts_count>0):
            print("yes admin")
            for i in range(accounts_count):
                try:
                    acc_accept = 0
                    account = accounts[str(i)]
                    acc_name    = account[0]
                    acc_email   = account[1]
                    acc_project = account[2]
                    if (len(account)>3): acc_accept = int(account[3])
                    
                    user = BeahUsers.objects.get(UserEmail=acc_email)
                    useremail = user.UserEmail
                    password = user.UserPassword
                    decpassword = decrypt(password)
                    status = 0

                    if (acc_accept==0): 
                        # set user status
                        BeahTeam.objects.filter(TeamID=user).update(UserStatus=1)
                        sent = sendEmail(useremail, password=decpassword, name=acc_name, custmsg="",
                                    subject="", status=status, callFrom="noteams12")
                        print(useremail , " : " , acc_accept , " => " , sent)
                    else: 
                        BeahTeam.objects.filter(TeamID=user).update(UserStatus=0)
                        sendEmail(useremail, password=decpassword, name=acc_name, custmsg="",
                                    subject="", status=status, callFrom="teams12")
                        print(useremail , " : " , acc_accept , " => " , sent)
                except:
                    pass

            return http.HttpResponse('success')

    return http.HttpResponse('no')

@api_view(['POST'])
def accountMissing(request):
    if request.method == 'POST':
            useremail = '76J1839@ibrict.edu.om'
            user = BeahUsers.objects.get(UserEmail=useremail)
            useremail = user.UserEmail
            password = user.UserPassword
            if (useremail!=None and password!=None):
                print("yes valid user")
                decpassword = decrypt(password)
                if (decpassword!=None):
                    print("yes valid password")
                    print("password : " , decpassword)
                
                    status = 0

                    s = sendEmail(useremail, password=decpassword, name="Rocketeer", custmsg="",
                                            subject="", status=status, callFrom="missing")

                    useremail = 'ev.developers@gmail.com'
                    decpassword = '12345678'
                    if (s): sendEmail(useremail, password=decpassword, name="DEVELOPER", custmsg="", subject="", status=status, callFrom="missing")

                    print("email sent successfully:)")


            return http.HttpResponse('success')

    return http.HttpResponse('no')

@api_view(['POST'])
def teamsStatusUpdate(request):
    if request.method == 'POST':
        data = request.data
        id = data['id']
        status = data['status']
        user = data['user']
        password = data['UserPassword']
        decpassword = decrypt(password)
        # # print('id', id, 'status', status, type(status))
        BeahTeam.objects.filter(TeamID=id).update(UserStatus=status)
        if status != "":
            sendEmail(user, password=decpassword, name="", custmsg="",
                      subject="", status=status, callFrom="team")

        # # print('update', data)
        return http.HttpResponse('Updated')


@api_view(['POST'])
def addArticles(request):
    if request.method == 'POST':
        data = request.data
        user = data['user']
        # # print('user',user)
        description = data['description']
        title = data['title']
        image = data['image']
        status = data['status']
        # # print('user', user, 'description', description,'title', title, 'image', image, 'status', status)
        # get Admin user
        # getAminValues = BeahUsers.objects.get(UserEmail=user)
        # # print('getAminValues', getAminValues)
        Store_in_articleTable = BeahArticles(
            ArticleTitle=title, ArticleDescription=description, ArticleImage=image, ArticleStatus=status)
        Store_in_articleTable.save()
        return http.HttpResponse('created')


@api_view(['GET'])
def displayArticles(request):
    if request.method == 'GET':
        Articles = BeahArticles.objects.all()
        serializer = articleSerializer(Articles, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def display4Articles(request):
    if request.method == 'GET':
        FirstArticles = BeahArticles.objects.first()
        print('FirstArticles',FirstArticles)
        Articles = BeahArticles.objects.all()[2:]
        firstArticleserializer = articleSerializer(FirstArticles)
        serializer = articleSerializer(Articles, many=True)
        data ={'FirstArticles':firstArticleserializer.data,'Articles':serializer.data}
        return Response(data)

# Get item Details


@api_view(['GET'])
def articlesDetails(request, id):
    try:
        article = BeahArticles.objects.get(ID=id)
    except article.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = articleSerializer(article)
        # # print('serializer', serializer.data)
        return JsonResponse(serializer.data, safe=False)


# Update Item
@api_view(['POST'])
def articleUpdate(request):
    id = request.data['ID']
    title = request.data['ArticleTitle']
    description = request.data['ArticleDescription']
    image = request.data['ArticleImage']
    if(request.data['ArticleStatus'] != ''):
        status = int(request.data['ArticleStatus'])
    else:
        status = -1
    # # print('update article id', id)
    # # print('data up', request.data)
    # # print('update article status', status)
    # # print('update article title', title)
    try:
        article = BeahArticles.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (title != ""):
            article.ArticleTitle = title
        if (description != ""):
            article.ArticleDescription = description
        if (image != ""):
            article.ArticleImage = image
        if (status != -1):
            article.ArticleStatus = status
        article.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


# Contact form
@api_view(['POST'])
def Contact(request):
    if request.method == 'POST':
        name = request.data['name']
        email = request.data['email']
        msg = request.data['msg']
        # # print('Contact', name, email, msg)
        send = sendEmail(user=email, password='', name=name,
                         subject="", custmsg=msg, status="", callFrom="contact")
        if send:
            return http.HttpResponse('success')

# Delete Item


@api_view(['POST'])
def deleteArticle(request):
    id = request.data['ID']
    # # print('deleteArticle', id)
    try:
        articleID = BeahArticles.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        articleID.delete()
        return http.HttpResponse('deleted')


# Get Project Details for team
@api_view(['GET'])
def projectDetails(request, email):
    if request.method == 'GET':
        project = []
        Subject = []
        # projectSubject =[]
        # # print('email from project', email)
        getuserInfo = BeahUsers.objects.get(UserEmail=email)
        team = BeahTeam.objects.get(TeamID=getuserInfo)
        teamId = getuserInfo.ID
        
        getmemberinfo = BeahMember.objects.filter(TeamID=team)
        getmemberCount = getmemberinfo.count()

        # # print('teamId', teamId)
        getprojectInfo = BeahProjects.objects.get(TeamID=team)
        # for project in  getprojectInfo:
        PID = getprojectInfo.ID
        PName = getprojectInfo.ProjectName
        PDescription = getprojectInfo.ProjectDescription
        if ('media/' not in str(getprojectInfo.ProjectProposal) and str(getprojectInfo.ProjectProposal)!="" ): PProposalPath = 'media/' + str(getprojectInfo.ProjectProposal)
        else: PProposalPath = str(getprojectInfo.ProjectProposal)
        if ('media/' not in str(getprojectInfo.projectLogo) and str(getprojectInfo.projectLogo)!=""): PlogoPath = 'media/' + str(getprojectInfo.projectLogo)
        else: PlogoPath = str(getprojectInfo.projectLogo)
        PProposalName = PProposalPath.replace("media/Proposal/", "")
        # # print('PProposalName', PProposalName)
        getSubjectInfo = BeahSubjects.objects.filter(ProjectID=PID)
        project.append({'PID': PID, 'PName': PName,
                       'PDescription': PDescription, 'PProposalPath': PProposalPath, 'PProposalName': PProposalName, 'PlogoPath': PlogoPath, 'memberCount': getmemberCount})
        for subject in getSubjectInfo:
            SID = subject.ID
            SName = subject.SubjectName
            SDes = subject.SubjectDescription
            getCommentsInfo = BeahSubjectsComments.objects.filter(
                SubjectID=subject)
            getLikeInfo = BeahSubjectsLike.objects.filter(
                SubjectID=subject)
            Subject.append({'SID': SID, 'SName': SName,'SDes':SDes,
                            'count': len(getCommentsInfo), 'countLike': len(getLikeInfo)})
        projectSubject = {'projects': project,
                          'subjects': Subject, 'ProjectID': PID}
        # project.append(Subject)
        # Return Json Data to react
        return JsonResponse(projectSubject, safe=False)


@api_view(['POST'])
def projecteUpdate(request):
    id = request.data['ID']
    if ('projectName' in request.data): Name = request.data['projectName']
    else: Name = ""

    if ('projectDescription' in request.data): Description = request.data['projectDescription']
    else: Description = ""
    
    if 'proposal' in request.data:
        file = request.data['proposal']
        print(file)
    else:
        file = None
    if 'Logo' in request.data:
        Logo = request.data['Logo']
    else:
        Logo = None
    # # print('projecteUpdate', Name, id, Description)
    # # print('file', file)
    try:
        project = BeahProjects.objects.get(ID=id)
        team = project.TeamID
        team_name = team.TeamName
        user = team.TeamID
        email = user.UserEmail
        passw = user.UserPassword

    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (Name != ""):
            project.ProjectName = Name
        if (Description != ""):
            project.ProjectDescription = Description
        if (file):
            project.ProjectProposal = file
        if (Logo):
            project.projectLogo = Logo
        project.save()

        if (file):
            useremail = email
            password = passw
            decpassword = decrypt(password)
            status = 0
            sendEmail(useremail, password=decpassword, name=team_name, custmsg="", subject="", status=status, callFrom="proposal")
            sendEmail(user="", password="", name=team_name, custmsg="", subject="", status=status, callFrom="proposaladmin")
            # proposaladmin
        
        if (Name!="" or Description!="" or file or Logo):
            try:
                put_projects_data_google_sheet()
            except: pass

        return http.HttpResponse('UpdatedProject')
    return http.HttpResponse('NotUpdatedProject')


@api_view(['POST'])
def addSubject(request):
    if request.method == 'POST':
        data = request.data
        # # print('data', data)
        Id = data['ID']
        
        # # print('count', type(count), count)
        Subdescription = data['subdescription']
        Subtitle = data['subtitle']
        status = data['status']
        
        # # print('image0', image0)
        projectObject = BeahProjects.objects.get(ID=Id)
        Store_in_SubjectTable = BeahSubjects(
            ProjectID=projectObject,SubjectStatus=status,SubjectName=Subtitle,SubjectDescription=Subdescription)
        Store_in_SubjectTable.save()
        # saveSubject = BeahSubjects.objects.latest('ID')
        # # # print('saveSubject', saveSubject)

        # if ('count' in data):
        #     count = int(data['count'])

        #     if ('images[0]' in data):
        #         image0 = data['images[0]']

        #     for x in range(count):
        #         str = f"images[{x}]"
        #         # # print('str', str)
        #         image = data[str]
        #         # # print('image', image)
        #         Store_in_SubjectImageTable = BeahSubjectsImages(
        #             SubjectID=saveSubject, SubjectImage=image)
        #         Store_in_SubjectImageTable.save()

        return http.HttpResponse('added')


@api_view(['POST'])
def deleteSubject(request):
    id = request.data['ID']
    # # print('deleteSubject', id)
    try:
        SubjectID = BeahSubjects.objects.get(ID=id)
        # # print('SubjectID', SubjectID)
        ImageRelatedSubject = BeahSubjectsImages.objects.filter(
            SubjectID=SubjectID)
        # # print('ImageRelatedSubject', ImageRelatedSubject)

    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        for img in ImageRelatedSubject:
            img.delete()
        SubjectID.delete()
        return http.HttpResponse('deleted')


@api_view(['GET'])
def SubjectDetails(request, SID, PID):
    projects = []
    subjects = []
    Images = []
    # # print('sid', SID, 'PID', PID)
    try:
        project = BeahProjects.objects.get(ID=PID)
        subject = BeahSubjects.objects.get(ID=SID)
        ImageRelatedSubject = BeahSubjectsImages.objects.filter(
            SubjectID=subject)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        if ('media/' not in str(project.ProjectProposal) and str(project.ProjectProposal)!=""): PProposalPath = 'media/' + str(project.ProjectProposal)
        else: PProposalPath = str(project.ProjectProposal)
        PProposalName = PProposalPath.replace("media/Proposal/", "")
        # # print('PProposalName', PProposalName)
        projects.append({'PID': project.ID, 'PName': project.ProjectName,
                         'PDescription':  project.ProjectDescription, 'PProposalPath': PProposalPath, 'PProposalName': PProposalName})
        subjects.append({'SID': subject.ID, 'SName': subject.SubjectName,
                         'Sstatus': subject.SubjectStatus, 'SDescription': subject.SubjectDescription})
        for img in ImageRelatedSubject:
            if ('media/' not in str(img.SubjectImage) and str(img.SubjectImage)!=""): simg = 'media/' + str(img.SubjectImage)
            else: simg = str(img.SubjectImage)
            Images.append({'ID': img.ID, 'IMG': simg})

        projectSubject = {'projects': projects,'SDescription': subject.SubjectDescription,
                          'subjects': subjects, 'Images': Images}
        return JsonResponse(projectSubject, safe=False)

    return http.HttpResponse('NotUpdatedProject')


@api_view(['POST'])
def deleteImageSubject(request):
    id = request.data['ID']
    # # print('deleteSubject', id)
    try:
        ImageID = BeahSubjectsImages.objects.get(ID=id)
        # # print('ImageID', ImageID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        ImageID.delete()
        return http.HttpResponse('deleted')


@api_view(['POST'])
def SubjectUpdate(request):
    SID = request.data['SID']
    SubjectName = request.data['SubjectName']
    SubjectDesc = request.data['SubjectDesc']
    print('SubjectDesc from update',SubjectDesc)
    Subjectstatus = request.data['Subjectstatus']
    # imageCount = int(request.data['count'])
    # # print('SID', SID, 'SubjectName', SubjectName)
    # # print('request.data', request.data, 'imageCount', imageCount)
    try:
        subject = BeahSubjects.objects.get(ID=SID)
        # # print('subject', subject)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (SubjectName != ""):
            subject.SubjectName = SubjectName
        if (Subjectstatus != ""):
            subject.SubjectStatus = Subjectstatus
        if (SubjectDesc != ""):
            subject.SubjectDescription = SubjectDesc
        subject.save()
        # for x in range(imageCount):
        #     str = f"images[{x}]"
        #     # # print('str', str)
        #     image = request.data[str]
        #     # # print('image', image)
        #     Store_in_SubjectImageTable = BeahSubjectsImages(
        #         SubjectID=subject, SubjectImage=image)
        #     Store_in_SubjectImageTable.save()
        return http.HttpResponse('update')


# Get team Details for team
@api_view(['GET'])
def teamDetails(request, email):
    if request.method == 'GET':
        # projectSubject =[]
        # # print('email from team details', email)
        try:
            getuserInfo = BeahUsers.objects.get(UserEmail=email)
        except getuserInfo.DoesNotExist:
            return HttpResponse(status=404)
        teamId = getuserInfo.ID
        # # print('teamId', teamId)
        getteamInfo = BeahTeam.objects.get(TeamID=teamId)
        projectinfo = BeahProjects.objects.filter(TeamID=getteamInfo)
        print("getprojectinfo:" , projectinfo)
        getmemberinfo = BeahMember.objects.filter(TeamID=getteamInfo)
        getmemberCount = getmemberinfo.count()

        col = getteamInfo.CollegeName
        print("col: " , col)
        # getcollegeinfo = BeahProjects.objects.filter(ID=getteamInfo.CollegeName)
        college = str(col.CollegeName)
        # try:
        #     getcollegeinfo = BeahProjects.objects.filter(ID=getteamInfo.CollegeName)
        #     college = str(getcollegeinfo.CollegeName)
        # except: college = ""

        # # print('getmemberCount', getmemberCount)
        mserializer = memberSerializer(getmemberinfo, many=True)
        # # print('mserializer', mserializer)
        logo = projectinfo[0].projectLogo
        print(logo)
        if ('media/' not in str(logo) and str(logo)!=""): pLogo = 'media/' + str(logo)
        else: pLogo = str(logo)
        # # print('getprojectifo', getprojectinfo, pLogo)
        tserializer = teamSerializer(getteamInfo)
        # # print('tserializer', tserializer.data)
        data = {'team': tserializer.data, 'pLogo': pLogo, 'college': college,
                'members': mserializer.data, 'getmemberCount': getmemberCount}
        print(data)
        return Response(data)

@api_view(['GET'])
def ApprovedTeams(request):
    AppTeams=[]
    # approvedTeams=BeahTeam.objects.filter(UserStatus=0)
    approvedTeams=BeahTeam.objects.filter(UserStatus=0)
    for team in approvedTeams:
        proj = BeahProjects.objects.get(TeamID=team)
        checkVote=BeahTeamVote.objects.filter(TeamID=team)
        college = team.CollegeName_id
        collegeID = BeahTecCollege.objects.get(ID=college)
        AppTeams.append({
            'ID':team.ID,
            'TeamName':team.TeamName,
            'MemberNum':team.MemberNum,
            'TeamLogo':str(team.TeamLogo),
            'ProjectName':proj.ProjectName,
            'ProjectProposal':str(proj.ProjectProposal),
            'ProjectID':proj.ID,
            'collegeName' : collegeID.CollegeName,
            'VoteNum':len(checkVote)
        })

    newAppTeams = sorted(AppTeams, key=lambda d: d['VoteNum'], reverse=True) 

    data = {'AppTeams': newAppTeams}
    print(data)
    return Response(data)
  
@api_view(['POST'])
def TeamPhoneNumUpdate(request):
    if request.method == 'POST':
        id = request.data['ID']
        phone = request.data['phone']
        # # print('id TeamPhoneNumUpdate', id, 'phone', phone)
        team = BeahTeam.objects.get(ID=id)
        if (phone != ""):
            team.PhoneNum = phone
            team.save()
            return http.HttpResponse('update')


@api_view(['POST'])
def TeamMemberNumUpdate(request):
    if request.method == 'POST':
        id = request.data['ID']
        updateMember = request.data['updateMember']
        # # print('id TeamMemberNumUpdate', id, 'updateMember', updateMember)
        team = BeahTeam.objects.get(ID=id)
        if (updateMember != ""):
            team.MemberNum = updateMember
            team.save()
            return http.HttpResponse('update')
    return http.HttpResponse('NotUpdate')


@api_view(['POST'])
def addMember(request):
    if request.method == 'POST':
        print(request.data)
        teamID = request.data['TID']
        # # print('teamID', teamID)
        # get team instance
        getteam = BeahTeam.objects.get(TeamID=teamID)
        # # print('getteam from member',  getteam)
        # MemberNumber = int(request.data['MemberNumber'])
        MemberNumber = 5
        MName = request.data['memberName']
        MMajor = request.data['memberMajor']
        MDescription = request.data['membeDescription']
        MGender = request.data['gender']
        MYear = request.data['year']
        if 'memberImage' in request.data:
            MImg = request.data['memberImage']
        else:
            MImg = None
        # get how many member in table
        countMember = BeahMember.objects.filter(TeamID=getteam).count()
        # # print('member request.data:', request.data)
        # # print('member countMember:', type(countMember), countMember)
        if countMember < MemberNumber:
            Store_in_MemberTable = BeahMember(
                MemberName=MName, MemberMajor=MMajor, MemberDescription=MDescription, TeamID=getteam,
                MemberGender=MGender, MemberStudyYear=MYear, MemberImage=MImg)
            Store_in_MemberTable.save()

            countMember += 1

            if (countMember>=3):
                BeahTeam.objects.filter(TeamID=teamID).update(MemberNum=countMember)
            
            try:
                put_projects_data_google_sheet()
            except: pass

            return http.HttpResponse('Madded')
        else:
            return http.HttpResponse('NotAdded')


@api_view(['POST'])
def deleteMember(request):
    id = request.data['ID']
    # # print('deleteMember', id)
    try:
        MemberID = BeahMember.objects.get(ID=id)
        # # print('MemberID', MemberID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        MemberID.delete()
        return http.HttpResponse('deleted')


@api_view(['GET'])
def MemberDetails(request, MID, TID):
    if request.method == 'GET':
        # # print('MemberDetails:', 'MID', MID, 'TID', TID)
        teamInfo = BeahTeam.objects.get(TeamID=TID)
        getprojectLogo = BeahProjects.objects.get(TeamID=teamInfo)
        getmemberinfo = BeahMember.objects.filter(TeamID=teamInfo)
        getmemberCount = getmemberinfo.count()
        if ('media/' not in str(getprojectLogo.projectLogo) and str(getprojectLogo.projectLogo)!=""): pLogo = 'media/' + str(getprojectLogo.projectLogo)
        else: pLogo = str(getprojectLogo.projectLogo)
        MemberInfo = BeahMember.objects.get(ID=MID)
        Mserializer = memberSerializer(MemberInfo)
        Tserializer = teamSerializer(teamInfo)
        data = {'team': Tserializer.data, 'members': Mserializer.data,
                'pLogo': pLogo, 'getmemberCount': getmemberCount}
        return Response(data)


@api_view(['POST'])
def MemberUpdate(request):
    if request.method == 'POST':
        memberid = request.data['memberNameID']
        memberName = request.data['memberName']
        memberMajor = request.data['memberMajor']
        memberDescription = request.data['memberDescription']
        if 'memberImage' in request.data:
            memberImage = request.data['memberImage']
        else:
            memberImage = None
        getMember = BeahMember.objects.get(ID=memberid)
        if (memberName != ""):
            getMember.MemberName = memberName
        if (memberMajor != ""):
            getMember.MemberMajor = memberMajor
        if (memberDescription != ""):
            getMember.MemberDescription = memberDescription
        if (memberImage):
            getMember.MemberImage = memberImage
        getMember.save()
        return http.HttpResponse('update')
    return http.HttpResponse('NotUpdate')

@api_view(['GET'])
def Projects12Teams_(request):
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(UserStatus=0)
        projects = []
        for team in teams:
            proj = BeahProjects.objects.get(TeamID=team)
            projects.append(proj)

   
        # return all projects
        allprojectSerializer = projectSerializer(projects, many=True)

        # filter projects depend on project Problems
        challenges = BeahChallenge.objects.all()
        chSerializer = ChallengesSerializer(challenges, many=True)
        Ser = []
        for challenge in challenges:
            projectsfilter = []
            for pr in projects:
                if (pr.ProjectProblem==challenge):
                    projectsfilter.append(pr)
            
            # projectsfilter = BeahProjects.objects.filter( ProjectProblem=challenge)
            
            Serializer = projectSerializer(projectsfilter, many=True)
            Ser.append(Serializer)

        call_num = len(Ser)
        # # print(call_num)
        all_chall = []
        # # print('type Ser', type(list(Ser)))
        data = {'projects': allprojectSerializer.data, 'challenge_num': call_num, 'challenges': chSerializer.data}
        for i in range(call_num):
            # data['challenge_' + str(i)] = Ser[i].data
            all_chall.append(Ser[i].data)

        data['all_challenge'] = all_chall

        print("date: ", data)

        return Response(data)


@api_view(['GET'])
def Projects12Teams(request):
    winTeams=[]
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(UserStatus=0)
        for team in teams:
            proj = BeahProjects.objects.get(TeamID=team)
            checkVote=BeahTeamVote.objects.filter(TeamID=team)
            print('len(checkVote)',len(checkVote))
            winTeams.append({"projectID":proj.ID,"projectName":proj.ProjectName,"projectLogo":str(proj.projectLogo),
            "TeamID":team.ID, "TeamName":team.TeamName,
            "TeamLogo":str(team.TeamLogo),
            "VoteNum":len(checkVote)
            })
       
        newWinTeams = sorted(winTeams, key=lambda d: d['VoteNum'], reverse=True) 

        data = {'winTeams': newWinTeams}

        return Response(data)


@api_view(['GET'])
def Projects(request):
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(selected=1)
        projects = []
        for team in teams:
            proj = BeahProjects.objects.get(TeamID=team)
            proposal = proj.ProjectProposal
            if (proposal):
                projects.append(proj)

        print("number of projects that has proposal: ", len(projects))
        # projects = BeahProjects.objects.all()
        # return all projects
        allprojectSerializer = projectSerializer(projects, many=True)
        print(projects)
        print(allprojectSerializer)
        # return the first 4 projects
        # projects_4 = BeahProjects.objects.all()[:4]
        projects_4 = projects[:4]
        # return from 4 to 8 projects
        ProjectSerializer = projectSerializer(projects_4, many=True)
        # projects_8 = BeahProjects.objects.all()[4:8]
        projects_8 = projects[4:8]
        ProjectSerializer8 = projectSerializer(projects_8, many=True)
        # filter projects depend on project Problems
        challenges = BeahChallenge.objects.all()
        chSerializer = ChallengesSerializer(challenges, many=True)
        Ser = []
        for challenge in challenges:
            projectsfilter = []
            for pr in projects:
                if (pr.ProjectProblem==challenge):
                    projectsfilter.append(pr)
            
            # projectsfilter = BeahProjects.objects.filter( ProjectProblem=challenge)
            
            Serializer = projectSerializer(projectsfilter, many=True)
            Ser.append(Serializer)

        call_num = len(Ser)
        # # print(call_num)
        all_chall = []
        # # print('type Ser', type(list(Ser)))
        data = {'projects4': ProjectSerializer.data, 'projects8': ProjectSerializer8.data,
                'projects': allprojectSerializer.data, 'challenge_num': call_num, 'challenges': chSerializer.data}
        for i in range(call_num):
            # data['challenge_' + str(i)] = Ser[i].data
            all_chall.append(Ser[i].data)

        data['all_challenge'] = all_chall

        return Response(data)

@api_view(['GET'])
def Ideas(request):
    if request.method == 'GET':
        # teams = BeahTeam.objects.filter(UserStatus=0)
        # projects = []
        # for team in teams:
        #     projects.append(BeahProjects.objects.filter(TeamID=team))

        projects = BeahProjects.objects.filter(selected=1)
        # return all projects
        allprojectSerializer = projectSerializer(projects, many=True)
        # return the first 4 projects
        projects_4 = BeahProjects.objects.filter(selected=1)[:4]
        # return from 4 to 8 projects
        ProjectSerializer = projectSerializer(projects_4, many=True)
        projects_8 = BeahProjects.objects.filter(selected=1)[4:8]
        ProjectSerializer8 = projectSerializer(projects_8, many=True)
        # filter projects depend on project Problems
        challenges = BeahChallenge.objects.all()
        chSerializer = ChallengesSerializer(challenges, many=True)
        Ser = []
        for challenge in challenges:
            # # print('challenge', challenge)
            projectsfilter = BeahProjects.objects.filter(
                ProjectProblem=challenge, selected=1)
            # # print('projectsfilter', projectsfilter)

            Serializer = projectSerializer(projectsfilter, many=True)
            Ser.append(Serializer)

        call_num = len(Ser)
        # # print(call_num)
        all_chall = []
        # # print('type Ser', type(list(Ser)))
        data = {'projects4': ProjectSerializer.data, 'projects8': ProjectSerializer8.data,
                'projects': allprojectSerializer.data, 'challenge_num': call_num, 'challenges': chSerializer.data}
        for i in range(call_num):
            # data['challenge_' + str(i)] = Ser[i].data
            all_chall.append(Ser[i].data)

        data['all_challenge'] = all_chall

        return Response(data)


@api_view(['GET'])
def Projects2(request):
    if request.method == 'GET':
        # teams = BeahTeam.objects.filter(UserStatus=0)
        # projects = []
        # for team in teams:
        #     projects.append(BeahProjects.objects.filter(TeamID=team))

        projects = BeahProjects.objects.raw("SELECT backapi_beahprojects.* FROM backapi_beahprojects INNER JOIN backapi_beahteam ON backapi_beahprojects.TeamID_id=backapi_beahteam.ID WHERE backapi_beahteam.UserStatus=0")
        # return all projects
        allprojectSerializer = projectSerializer(projects, many=True)

        # return the first 4 projects
        projects_4 = projects
        # return from 4 to 8 projects
        ProjectSerializer = projectSerializer(projects_4, many=True)
        projects_8 = projects
        ProjectSerializer8 = projectSerializer(projects_8, many=True)
        # filter projects depend on project Problems
        challenges = BeahChallenge.objects.all()
        chSerializer = ChallengesSerializer(challenges, many=True)
        Ser = []
        for challenge in challenges:
            # # print('challenge', challenge)
            projectsfilter = BeahProjects.objects.filter(
                ProjectProblem=challenge)
            # # print('projectsfilter', projectsfilter)

            Serializer = projectSerializer(projectsfilter, many=True)
            Ser.append(Serializer)

        call_num = len(Ser)
        # # print(call_num)
        all_chall = []
        # # print('type Ser', type(list(Ser)))
        data = {'projects4': ProjectSerializer.data, 'projects8': ProjectSerializer8.data,
                'projects': allprojectSerializer.data, 'challenge_num': call_num, 'challenges': chSerializer.data}
        for i in range(call_num):
            # data['challenge_' + str(i)] = Ser[i].data
            all_chall.append(Ser[i].data)

        data['all_challenge'] = all_chall

        return Response(data)


@api_view(['GET'])
def ProjectsDetails(request, id):
    SubjectImages = []
    subjects = []
    if request.method == 'GET':
        projectID = id
        # # print('projectID', projectID)
        getProject = BeahProjects.objects.get(ID=projectID)
        # # print('getProject.ProjectProblem', getProject.ProjectProblem_id)
        getChallenge = BeahChallenge.objects.get(
            ID=getProject.ProjectProblem_id)
        # # print('getChallenge.Title', getChallenge.Title)
        ChallengeName = getChallenge.Title
        ProjSerializer = projectSerializer(getProject)
        teamID = getProject.TeamID_id
        # # print('teamID', type(teamID), teamID)
        getteam = BeahTeam.objects.get(ID=teamID)

        getMemebers = BeahMember.objects.filter(TeamID=teamID)
        members = getMemebers.count()

        getCollege = BeahTecCollege.objects.get(ID=getteam.CollegeName_id)
        CollegeName = getCollege.CollegeName
        # # print('getCollege.CollegeName')
        tSerializer = teamSerializer(getteam)
        getmember = BeahMember.objects.filter(TeamID=getteam)
        mSerializer = memberSerializer(getmember, many=True)
        # # print('getmember', getmember)
        getuser = BeahUsers.objects.get(ID=getteam.TeamID_id)
        getteamContact = getuser.UserEmail
        # # print('getteam', getteam)
        # # print('getteamContact', getteamContact)
        getsubject = BeahSubjects.objects.filter(ProjectID=projectID)
        SubSerializer = subjectSerializer(getsubject, many=True)
        for sub in getsubject:
            SubjectId = sub.ID
            Subjectdate = (sub.publishDate).strftime("%d/%m/%y")
            # # print('SubjectId', SubjectId)
            getsubjectImage = BeahSubjectsImages.objects.filter(
                SubjectID=SubjectId)
            getComments = BeahSubjectsComments.objects.filter(
                SubjectID=SubjectId)
            getLikes = BeahSubjectsLike.objects.filter(SubjectID=SubjectId)
            # # print('getComments ...', type(getComments),len(getComments), getComments)
            subjects.append({'ID': sub.ID, 'SubjectName': sub.SubjectName,
                             'SubjectDescription': sub.SubjectDescription,
                             'publishDate': Subjectdate, 'SubjectStatus': sub.SubjectStatus,
                             'countComments': len(getComments), 'countLikes': len(getLikes)})
            for img in getsubjectImage:
                Subimage = img.SubjectImage
                if ('media/' not in str(Subimage) and str(Subimage)!=""): img = 'media/' + str(Subimage)
                else: img = str(Subimage)
                SubjectImages.append({'SubjectImage': img})
                # # print('SubjectImages', SubjectImages)
        data = {'ProjectInfo': ProjSerializer.data, 'getteam': tSerializer.data, 'members': members,
                'getmember': mSerializer.data, 'getteamContact': getteamContact,
                'SubjectImages': SubjectImages, 'getSubjects': subjects, 'ChallengeName': ChallengeName, 'CollegeName': CollegeName}
        # # print('data', data)
        return Response(data)


@api_view(['GET'])
def SubjectDetailsPage(request, pid, tid, sid):
    SubjectImages = []
    Comments = []
    if request.method == 'GET':
        Project_id = pid
        team_id = tid
        subject_id = sid
        # # print('Project_id', Project_id, 'team_id',team_id, 'subject_id', subject_id)
        getteam = BeahTeam.objects.get(ID=team_id)
        colleageID =getteam.CollegeName_id
        getCollege = BeahTecCollege.objects.get(ID=colleageID)
        getCollegeName = getCollege.CollegeName
        # # print('getCollegeName',getCollegeName)
        # # print('colleageID fro SubjectDetailsPage',colleageID)
        tSerializer = teamSerializer(getteam)
        getProject = BeahProjects.objects.get(ID=Project_id)
        ProjSerializer = projectSerializer(getProject)
        getsubject = BeahSubjects.objects.get(ID=subject_id)
        subSerializer = subjectSerializer(getsubject)
        getsubjectImage = BeahSubjectsImages.objects.filter(
            SubjectID=subject_id)
        getcomments = BeahSubjectsComments.objects.filter(SubjectID=subject_id)
        CountLikes = BeahSubjectsLike.objects.filter(SubjectID=subject_id)
        for comment in getcomments:
            uID = comment.UserID_id
            vID = comment.visitorID_id
            dID = comment.DjangoID_id
            if uID:
                getuser = BeahUsers.objects.get(ID=uID)
                email = getuser.UserEmail
            if vID:
                getvisitor = BeahVisitors.objects.get(ID=vID)
                email = getvisitor.UserEmail
            if dID:
                getDjnago = User.objects.get(id=dID)
                email = getDjnago.email
            date = (comment.Date).strftime("%d/%m/%y")
            Comments.append({'CommentID': comment.ID, 'Comments': comment.Comments,
                            'email': email, 'date': date})
            # # print('Comments', Comments)
        for img in getsubjectImage:
            Subimage = img.SubjectImage
            if ('media/' not in str(Subimage) and str(Subimage)!=""): subimg = 'media/' + str(Subimage)
            else: subimg = str(Subimage)
            SubjectImages.append({'SubjectImage': subimg})
            # # print('SubjectImages', SubjectImages)
        # MakeLike = checkUserMakeLike(subject_id)
        # # print('MakeLike', MakeLike)
        # data = {'project': ProjSerializer.data,
        #         'team': tSerializer.data, 'subject': subSerializer.data,
        #         'SubImages': SubjectImages, 'Comments': Comments,
        #         'CommentsCount': len(getcomments), 'CountLikes': len(CountLikes), 'MakeLike': MakeLike}
        data = {'project': ProjSerializer.data,
                'team': tSerializer.data, 'subject': subSerializer.data,
                'SubImages': SubjectImages, 'Comments': Comments,
                'CommentsCount': len(getcomments), 'CountLikes': len(CountLikes),'CollegeName':getCollegeName}
        # # print('data', data)
        return Response(data)


@api_view(['GET'])
def DisplayProjectInAdmin(request):
    if request.method == 'GET':
        Info = []
        # UserStatus
        # getteam = BeahTeam.objects.all()
        getteam = BeahTeam.objects.filter(selected=1)
        for team in getteam:
            getuser = BeahUsers.objects.get(ID=team.TeamID_id)
            college = team.CollegeName_id
            # get college instance
            collegeID = BeahTecCollege.objects.get(ID=college)
            collegeName = collegeID.CollegeName
            getProject = BeahProjects.objects.get(TeamID=team)
            members = BeahMember.objects.filter(TeamID=team)
            members_count = len(members)
            ProjectD = (getProject.publishDate).strftime("%d/%m/%y")
            if ('media/' not in str(getProject.ProjectProposal) and str(getProject.ProjectProposal)!="" ): ProjectProposal = 'media/' +str(getProject.ProjectProposal)
            else: ProjectProposal = str(getProject.ProjectProposal)
            if str(getProject.ProjectProposal)!="":
                Info.append({'teamID': team.ID, 'teamN': team.TeamName, 'teamColleage': collegeName, 'teamPhone': team.PhoneNum,
                            'ProjectID': getProject.ID, 'ProjectN': getProject.ProjectName, 'members': members_count,
                            'ProjectD': ProjectD, 'ProjectProposal': ProjectProposal, 'userEmail': getuser.UserEmail})
        
        for team in getteam:
            getuser = BeahUsers.objects.get(ID=team.TeamID_id)
            college = team.CollegeName_id
            # get college instance
            collegeID = BeahTecCollege.objects.get(ID=college)
            collegeName = collegeID.CollegeName
            getProject = BeahProjects.objects.get(TeamID=team)
            members = BeahMember.objects.filter(TeamID=team)
            members_count = len(members)
            ProjectD = (getProject.publishDate).strftime("%d/%m/%y")
            if ('media/' not in str(getProject.ProjectProposal) and str(getProject.ProjectProposal)!="" ): ProjectProposal = 'media/' +str(getProject.ProjectProposal)
            else: ProjectProposal = str(getProject.ProjectProposal)
            if str(getProject.ProjectProposal)=="":
                Info.append({'teamID': team.ID, 'teamN': team.TeamName, 'teamColleage': collegeName, 'teamPhone': team.PhoneNum,
                            'ProjectID': getProject.ID, 'ProjectN': getProject.ProjectName, 'members': members_count,
                            'ProjectD': ProjectD, 'ProjectProposal': ProjectProposal, 'userEmail': getuser.UserEmail})
        
        
        data = {'Info': Info}

        try:
            put_projects_data_google_sheet()
        except: pass

        return Response(data)


@api_view(['GET'])
def ProjectDetailsAdmin(request, pid):
    if request.method == 'GET':
        getProject = BeahProjects.objects.get(ID=pid)
        ProjSerializer = projectSerializer(getProject)
        data = {'Project': ProjSerializer.data}
        return Response(data)


@api_view(['POST'])
def EmailToAllParticipate_3(request):
    if request.method == 'POST':
        teams = BeahTeam.objects.filter(selected=1)
        projects = []
        for team in teams:
            proj = BeahProjects.objects.get(TeamID=team)
            proposal = proj.ProjectProposal
            if (proposal):
                getUser = team.TeamID
                getEmail = getUser.UserEmail
                if (getEmail!="mariam.baitsaid@gmail.com"):
                    send = sendEmail(user=getEmail, password='', name='', custmsg='',
                            subject='', status='', callFrom='Anounce')
                    print(getEmail , " -> " , str(send) )

        if len(teams)>0 and send:
            send = sendEmail(user=['ev.developers@gmail.com'], password='', name='', custmsg='',
                            subject='', status='', callFrom='Anounce')
            return http.HttpResponse('success')
        return http.HttpResponse('')


@api_view(['POST'])
def EmailToAllParticipate_FromTxtEditor(request):
    if request.method == 'POST':
        recipientsList = []
        sub = request.data['subject']
        message = request.data['msg']
        print('sub message',sub,message)
        getteamApproved = BeahTeam.objects.filter(selected=1)
        for team in getteamApproved:
            getUser = team.TeamID
            getEmail = getUser.UserEmail
            recipientsList.append(getEmail)
        if (len(recipientsList)>0):
            print(len(recipientsList))
            print(recipientsList)
            send = sendEmail(user=getEmail, password='', name='', custmsg=message,
                            subject=sub, status='', callFrom='AllParticipate')
        if len(recipientsList)>0 and send:
            send = sendEmail(user=['ev.developers@gmail.com'], password='', name='', custmsg=message,
                            subject=sub, status='', callFrom='AllParticipate')
            return http.HttpResponse('success')

@api_view(['POST'])
def EmailToAllParticipate(request):
    if request.method == 'POST':
        recipientsList = []
        subject = request.data['subject']
        msg = request.data['msg']
        approvedTeams = BeahTeam.objects.filter(UserStatus=0)
        print("=================================")
        # for team in approvedTeams:
        #     getUser = team.TeamID
        #     if (getUser):
        #         getEmail = getUser.UserEmail
        #         password = getUser.UserPassword
        #         decpassword = decrypt(password)
        #         send = sendEmail(user=getEmail, password=decpassword, name='', custmsg='',
        #                     subject='', status='', callFrom='vote')
        #         sent = False
        #         if (send): sent = True
        #         print(getEmail , " -> ", str(sent))
        #         # print(getEmail)
        
        # print("=================================")
                
        # if (len(recipientsList)>0):
        #     print(len(recipientsList))
        #     print(recipientsList)
        #     send = sendEmail(user=recipientsList, password='', name='', custmsg=msg,
        #                     subject=subject, status='', callFrom='All')

        # if len(approvedTeams)>0 and send:
        if True:
            send = sendEmail(user='ev.developers@gmail.com', password='123456', name='', custmsg='',
                            subject='', status='', callFrom='Anounce')
            return http.HttpResponse('success')

def sendMissing(request):
    if request.method == 'POST':
        recipientsList = []
        subject = request.data['subject']
        msg = request.data['msg']
        getteamApproved = BeahTeam.objects.filter(selected=1)
        for team in getteamApproved:
            getUser = team.TeamID
            getEmail = getUser.UserEmail
            recipientsList.append(getEmail)
        if (len(recipientsList)>0):
            print(len(recipientsList))
            print(recipientsList)
            send = sendEmail(user=recipientsList, password='', name='', custmsg=msg,
                            subject=subject, status='', callFrom='All')
        if len(recipientsList)>0 and send:
            send = sendEmail(user=['ev.developers@gmail.com'], password='', name='', custmsg=msg,
                            subject=subject, status='', callFrom='All')
            return http.HttpResponse('success')



@api_view(['POST'])
def EmailToAllParticipate_2(request):
    if request.method == 'POST':
        recipientsList = []
        subject = request.data['subject']
        msg = request.data['msg']
        getUsers = BeahUsers.objects.filter(UserType=1)
        for user in getUsers:
            getteamApproved = BeahTeam.objects.get(TeamID=user)
            getstatus = getteamApproved.UserStatus
            # # print('getstatus from EmailToAllParticipate', getstatus)
            if getstatus == 0:
                getEmail = user.UserEmail
                recipientsList.append(getEmail)
                # # print('recipientsList from EmailToAllParticipate', recipientsList)
        if (len(recipientsList)>0):
            send = sendEmail(user=recipientsList, password='', name='', custmsg=msg,
                            subject=subject, status='', callFrom='NewTimeLine')
        # # print('getUsers from EmailToAllParticipate', getUsers)
        if len(recipientsList)>0 and send:
            return http.HttpResponse('success')




@api_view(['POST'])
def addComments(request):
    if request.method == 'POST':
        comment = request.data['comment']
        subjectID = request.data['subjectID']
        userEmail = request.data['email']
        getsubject = BeahSubjects.objects.get(ID=subjectID)

        if (userEmail != ""):
            checkInUser = BeahUsers.objects.filter(
                UserEmail=userEmail).exists()
            checkInDjango = User.objects.filter(
                email=userEmail).exists()
            checkInVisitor = BeahVisitors.objects.filter(
                UserEmail=userEmail).exists()
            if checkInUser:
                getuserInfo = BeahUsers.objects.get(UserEmail=userEmail)
                Store_in_CommentsTable = BeahSubjectsComments(
                    Comments=comment, SubjectID=getsubject, UserID=getuserInfo)
            if checkInDjango:
                getDjangoInfo = User.objects.get(email=userEmail)
                Store_in_CommentsTable = BeahSubjectsComments(
                    Comments=comment, SubjectID=getsubject, DjangoID=getDjangoInfo)
            if checkInVisitor:
                getVisitorInfo = BeahVisitors.objects.get(UserEmail=userEmail)
                Store_in_CommentsTable = BeahSubjectsComments(
                    Comments=comment, SubjectID=getsubject, visitorID=getVisitorInfo)
            Store_in_CommentsTable.save()
        return http.HttpResponse('add')


@api_view(['POST'])
def CheckPrivilege(request):
    comments = []
    if request.method == 'POST':
        subjectID = int(request.data['SID'])
        # # print('subjectID send', type(subjectID), subjectID)
        email = request.data['email']
        checkUser = BeahUsers.objects.filter(UserEmail=email).exists()
        checkvisitor = BeahVisitors.objects.filter(
                UserEmail=email).exists()
        checkDjango= User.objects.filter(
                email=email).exists()
        if checkUser:
            getuser = BeahUsers.objects.get(UserEmail=email)
            userid = getuser.ID
        if checkvisitor:
            # checkvisitor = BeahVisitors.objects.filter(
            #     UserEmail=email).exists()
            # if checkvisitor:
            getvisitor = BeahVisitors.objects.get(UserEmail=email)
            userid = getvisitor.ID
        if checkDjango:
            # checkvisitor = BeahVisitors.objects.filter(
            #     UserEmail=email).exists()
            # if checkvisitor:
            getDjango = User.objects.get(email=email)
            userid = getDjango.id

        subjectsComments = BeahSubjectsComments.objects.filter(
            SubjectID=subjectID)
        for comment in subjectsComments:
            uid = comment.UserID_id
            vid = comment.visitorID_id
            did = comment.DjangoID_id
            CommentID = comment.ID
            # # print("uid: ", uid)
            # # print("vid: ", vid)
            # # print("did: ", did)
            # # print("user id: ", userid)
            Comment = comment.Comments
            date = comment.Date.strftime("%d-%m-%Y")
            if uid != None:
                # uemail=''
                # vemail=''
                try:
                        getuemail = BeahUsers.objects.get(ID=uid)
                        uemail = getuemail.UserEmail
                        # # print('useremail',uemail)
                except:
                        pass
                if uid == userid:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': uemail, 'privilege': '1'})
                    # # print('comments',comments)
                else:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': uemail, 'privilege': '0'})
                    # # print('comments',comments)
            if vid != None:
                try:
                    getvemail = BeahVisitors.objects.get(ID=vid)
                    vemail = getvemail.UserEmail
                except:
                    pass
                    
                if vid == userid:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': vemail, 'privilege': '1'})
                    # # print('comments',comments)
                else:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': vemail, 'privilege': '0'})
                    # # print('comments',comments)
            if did != None:
                try:
                    getdemail = User.objects.get(id=did)
                    demail = getdemail.email
                    # # print('djangoemail',demail)
                except Exception as e:
                    pass
                if did == userid:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': demail, 'privilege': '1'})
                    # # print('comments',comments)
                else:
                    comments.append(
                        {'CommentID':CommentID,'Comment': Comment, 'date': date, 'email': demail, 'privilege': '0'})
                    # # print('comments',comments)
        # # print('final comments',comments)
        return Response(comments)

        # if checkUser:

        #     # print('userid from CheckPrivilege', userid)
        #     for comment in subjectsComments:
        #         uid = comment.UserID_id
        #         try:
        #             getuemail = BeahUsers.objects.get(ID=uid)
        #         except:
        #             pass
        #         uemail = getuemail.UserEmail
        #         # print('uid from CheckPrivilege', uid)
        #         date = comment.Date.strftime("%d-%m-%Y")
        #         Comment = comment.Comments
        #         if uid == userid:
        #             comments.append(
        #                 {'Comment': Comment, 'date': date, 'email': uemail, 'privilege': 'privilege'})
        #         else:
        #             comments.append(
        #                 {'Comment': Comment, 'date': date, 'email': uemail, 'privilege': 'Notprivilege'})

        # else:
        #     checkvisitor = BeahVisitors.objects.filter(
        #         UserEmail=email).exists()
        #     if checkvisitor:
        #         getvisitor = BeahVisitors.objects.get(UserEmail=email)
        #         visitorid = getvisitor.ID
        #         # print('visitorid from CheckPrivilege', visitorid)
        #         for comment in subjectsComments:
        #             vid = comment.visitorID_id
        #             try:
        #                 getvemail = BeahVisitors.objects.get(ID=vid)
        #             except:
        #                 pass
        #             vemail = getvemail.UserEmail
        #             # print('id form visitor from CheckPrivilege', vid)
        #             date = comment.Date.strftime("%d-%m-%Y")
        #             Comment = comment.Comments
        #             if vid == visitorid:
        #                 comments.append(
        #                     {'Comment': Comment, 'date': date, 'email': vemail, 'privilege': 'privilege'})
        #             else:
        #                 comments.append(
        #                     {'Comment': Comment, 'date': date, 'email': vemail, 'privilege': 'Notprivilege'})


@api_view(['POST'])
def deleteComments(request):
    id = request.data['ID']
    # # print('deleteComments', id)
    try:
        CommentID = BeahSubjectsComments.objects.get(ID=id)
        # # print('CommentID', CommentID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        CommentID.delete()
        return http.HttpResponse('deleted')


@api_view(['POST'])
def LikeButton(request):
    if request.method == 'POST':
        SubjectID = request.data['SID']
        email = request.data['email']
        role = request.data['role']
        getSubject = BeahSubjects.objects.get(ID=SubjectID)
        if role == 'admin':
            userID = BeahUsers.objects.filter(
                UserEmail=email).exists()
            if userID:
                getuserID = BeahUsers.objects.get(
                UserEmail=email)
                checkifemail = BeahSubjectsLike.objects.filter(
                UserID=getuserID, SubjectID=SubjectID).exists()
                # # print('LikeButton', checkifemail)
                if checkifemail:
                    LikeID = BeahSubjectsLike.objects.get(
                        UserID=getuserID, SubjectID=SubjectID)
                    LikeID.delete()
                    return http.HttpResponse('delete')
                else:
                    Store_in_LikeTable = BeahSubjectsLike(
                        UserID=getuserID, SubjectID=getSubject)
                    Store_in_LikeTable.save()
                    return http.HttpResponse('add')
            else:
                DjangoID = User.objects.filter(
                email=email).exists()
                if DjangoID:
                    getDjangoID = User.objects.get(email=email)
                    checkifemail = BeahSubjectsLike.objects.filter(
                    DjangoID=getDjangoID, SubjectID=SubjectID).exists()
                    # # print('LikeButton', checkifemail)
                    if checkifemail:
                        LikeID = BeahSubjectsLike.objects.get(
                            DjangoID=getDjangoID, SubjectID=SubjectID)
                        LikeID.delete()
                        return http.HttpResponse('delete')
                    else:
                        Store_in_LikeTable = BeahSubjectsLike(
                            DjangoID=getDjangoID, SubjectID=getSubject)
                        Store_in_LikeTable.save()
                        return http.HttpResponse('add')

        if role == 'team':
            teamID = BeahUsers.objects.filter(UserEmail=email).exists()
            if teamID:
                getteamID = BeahUsers.objects.get(UserEmail=email)
                checkifemail = BeahSubjectsLike.objects.filter(
                UserID=getteamID, SubjectID=SubjectID).exists()
                # # print('LikeButton', checkifemail)
                if checkifemail:
                    LikeID = BeahSubjectsLike.objects.get(
                        UserID=getteamID, SubjectID=SubjectID)
                    LikeID.delete()
                    return http.HttpResponse('delete')
                else:
                    Store_in_LikeTable = BeahSubjectsLike(
                        UserID=getteamID, SubjectID=getSubject)
                    Store_in_LikeTable.save()
                    return http.HttpResponse('add')  

        if role == 'visitor':
            visitorID = BeahVisitors.objects.filter(UserEmail=email).exists()
            if visitorID:
                getvisitorID = BeahVisitors.objects.get(UserEmail=email)
                checkifemail = BeahSubjectsLike.objects.filter(
                visitorID=getvisitorID, SubjectID=SubjectID).exists()
                # # print('LikeButton', checkifemail)
                if checkifemail:
                    LikeID = BeahSubjectsLike.objects.get(
                        visitorID=getvisitorID, SubjectID=SubjectID)
                    LikeID.delete()
                    return http.HttpResponse('delete')
                else:
                    Store_in_LikeTable = BeahSubjectsLike(
                        visitorID=getvisitorID, SubjectID=getSubject)
                    Store_in_LikeTable.save()
                    return http.HttpResponse('add')



@api_view(['POST'])
def checkUserMakeLike(request):
    if request.method == 'POST':
        checkLike =''
        SubjectID = request.data['SID']
        email = request.data['email']
        # # print('email',email)
        checkifuemail = BeahUsers.objects.filter(
            UserEmail=email).exists()
        # # print('checkifuemail',checkifuemail)
        checkifdjangoemail = User.objects.filter(
            email=email).exists()
        # # print('checkifdjangoemail',checkifdjangoemail)
        checkifvemail = BeahVisitors.objects.filter(
            UserEmail=email).exists()
        # # print('checkifvemail',checkifvemail)
        if checkifuemail:
            userID = BeahUsers.objects.get(UserEmail=email)
            # # print('checkUserMakeLike userID: ', userID)
            checkifulike = BeahSubjectsLike.objects.filter(
                UserID=userID, SubjectID=SubjectID).exists()
            if checkifulike:
                checkLike ='1'
                # # print('checkLike',checkLike)
                # # print('http.HttpResponse(1)')
                # return http.HttpResponse('1')
            else:
                checkLike ='0'
                # # print('checkLike',checkLike)
                # # print('http.HttpResponse(0)')
                # return http.HttpResponse('0')

        if checkifdjangoemail:
            user = User.objects.get(email=email)
            userID =user.id
            # # print('checkUserMakeLike userID: ', userID)
            checkifdjlike = BeahSubjectsLike.objects.filter(
                DjangoID=userID, SubjectID=SubjectID).exists()
            
            if checkifdjlike:
                checkLike ='1'
                # # print('checkLike',checkLike)
                # # print('http.HttpResponse(1)')
                # return http.HttpResponse('1')
            else:
                checkLike ='0'
                # # print('checkLike',checkLike)
                # # print('http.HttpResponse(0)')
                # return http.HttpResponse('0')
            
        if checkifvemail:
            # # print('if checkifvemail')
            visitorID = BeahVisitors.objects.get(UserEmail=email)
            vi= visitorID.ID
            # # print('checkUserMakeLike visitorID', vi)
            checkifvlike = BeahSubjectsLike.objects.filter(
                visitorID=visitorID,SubjectID=SubjectID).exists()
            # # print('checkifvlike',checkifvlike)
            if checkifvlike:
                checkLike ='1'
                # # print('checkLike',checkLike)
                # return http.HttpResponse('1')
            else:
                checkLike ='0'
                # # print('checkLike',checkLike)
                # return http.HttpResponse('0')
        data = {'checkLike':checkLike}
        return Response(data)
            


@api_view(['GET'])
def FooterDisplay(request):
    if request.method == 'GET':
        footer = BeahFooter.objects.all()
        serializer = FooterSerializer(footer, many=True)
        data = {'footer': serializer.data}
        response = Response(data)
        response["Access-Control-Allow-Origin"] = "*"
        return response
        # return Response(data)


@api_view(['POST'])
def FooterUpdate(request):
    if request.method == 'POST':
        facebook = request.data['facebook']
        twitter = request.data['twitter']
        linkedin = request.data['linkedin']
        instagram = request.data['instagram']
        privacy = request.data['privacy']
        conditions = request.data['conditions']
        checkData = BeahFooter.objects.all().exists()
        if checkData:
            getinfo = BeahFooter.objects.get(ID=1)
            if (facebook or facebook == ""):
                getinfo.facebookLink = facebook
            if (twitter or  twitter == ""):
                getinfo.TwiterLink = twitter
            if (linkedin  or linkedin == ""):
                getinfo.LinkedinLink = linkedin
            if (instagram  or instagram == ""):
                getinfo.InstagramLink = instagram
            if (conditions or conditions == ""):
                getinfo.Conditions = conditions
            if (privacy or privacy == ""):
                getinfo.Privacy = privacy
            getinfo.save()
            return http.HttpResponse('update')

        else:
            if (facebook != ""):
                Store_in_FooterTable = BeahFooter(
                    facebookLink=facebook)
            if (twitter != ""):
                Store_in_FooterTable = BeahFooter(
                    TwiterLink=twitter)
            if (linkedin != ""):
                Store_in_FooterTable = BeahFooter(
                    LinkedinLink=linkedin)
            if (instagram != ""):
                Store_in_FooterTable = BeahFooter(
                    InstagramLink=instagram)
            if (conditions != ""):
                Store_in_FooterTable = BeahFooter(
                    Conditions=conditions)
            if (privacy != ""):
                Store_in_FooterTable = BeahFooter(
                    Privacy=privacy)
            Store_in_FooterTable.save()
            return http.HttpResponse('update')


@api_view(['POST'])
def addPartener(request):
    if request.method == 'POST':
        data = request.data
        url = data['url']
        image = data['image']
        # # print('url', url, 'image', image)
        Store_in_partenerTable = BeahPartener(
            URl=url, Image=image)
        Store_in_partenerTable.save()
        return http.HttpResponse('partener')


@api_view(['GET'])
def displayPartener(request):
    if request.method == 'GET':
        Parteners = BeahPartener.objects.all()
        serializer = PartenerSerializer(Parteners, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def deletePartener(request):
    id = request.data['ID']
    # # print('deletePartener', id)
    try:
        PartenerID = BeahPartener.objects.get(ID=id)
        # # print('PartenerID', PartenerID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        PartenerID.delete()
        return http.HttpResponse('deleted')


@api_view(['GET'])
def PartenersDetails(request, id):
    # # print('id from Parteners', id)

    try:
        Partener = BeahPartener.objects.get(ID=id)
    except Partener.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PartenerSerializer(Partener)
        # # print('serializer', serializer.data)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def PartenerUpdate(request):
    id = request.data['ID']
    url = request.data['url']
    image = request.data['image']
    # # print('update Partener id', id)
    try:
        partener = BeahPartener.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (url != ""):
            partener.URl = url
        if (image != ""):
            partener.Image = image
        partener.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


@api_view(['GET'])
def displayChallenges(request):
    if request.method == 'GET':
        Challenges = BeahChallenge.objects.all()
        serializer = ChallengesSerializer(Challenges, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def addChallenge_1(request):
    if request.method == 'POST':
        data = request.data
        title = data['title']
        image = data['image']
        description = data['description']
        problem = data['problem']
        solution = data['solution']
        negative = data['negative']
        problemRepeat = data['problemRepeat']
        problemPlace = data['problemPlace']
        # print('title', title, 'image', image)
        Store_in_ChallengeTable = BeahChallenge(
            Title=title, Image=image, Description=description,
            Problems=problem, Negative=negative, Solution=solution,
            ProblemRepeat=problemRepeat, Places=problemPlace)
        Store_in_ChallengeTable.save()
        return http.HttpResponse('partener')


@api_view(['POST'])
def addChallenge(request):
    if request.method == 'POST':
        data = request.data
        title = data['title']
        image = data['image']
        description = data['description']
        problem = data['problem']
        solution = data['solution']
        negative = data['negative']
        problemRepeat = data['problemRepeat']
        problemPlace = data['problemPlace']
        if 'subtitle' in request.data:
            subtitle = request.data['subtitle']
        else:
             subtitle = ""
        if 'subdescription' in request.data:
            subdescription = request.data['subdescription']
        else:
             subdescription = ""
        # print('title', title, 'image', image)
        Store_in_ChallengeTable = BeahChallenge(
            Title=title, Image=image, Description=description,
            Problems=problem, Negative=negative, Solution=solution,
            ProblemRepeat=problemRepeat, Places=problemPlace,SubTitle = subtitle,SubDescription=subdescription)
        Store_in_ChallengeTable.save()
        return http.HttpResponse('partener')

@api_view(['POST'])
def deleteChallenge(request):
    id = request.data['ID']
    # print('deleteChallenge', id)
    try:
        ChallengeID = BeahChallenge.objects.get(ID=id)
        # print('ChallengeID', ChallengeID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        ChallengeID.delete()
        return http.HttpResponse('deleted')


@api_view(['GET'])
def challengeDetails(request, id):
    # print('id from challenge', id)
    try:
        challenge = BeahChallenge.objects.get(ID=id)
    except challenge.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        lastchallenge = BeahChallenge.objects.last()
        firstchallenge = BeahChallenge.objects.first()
        serializer = ChallengesSerializer(challenge)
        # print('serializer', serializer.data,'firstchallenge: ', firstchallenge.ID,'lastchallenge: ', lastchallenge.ID)
        data = {'challengeDetails': serializer.data,
                'firstchallenge': firstchallenge.ID, 'lastchallenge': lastchallenge.ID}
        return JsonResponse(data)
    return http.HttpResponse('challenge')


@api_view(['POST'])
def challengeUpdate_1(request):
    id = request.data['ID']
    title = request.data['title']
    image = request.data['image']
    description = request.data['description']
    problem = request.data['problem']
    solution = request.data['solution']
    negative = request.data['negative']
    problemRepeat = request.data['problemRepeat']
    problemPlace = request.data['problemPlace']
    # print('challengeUpdate id', id)
    try:
        challenge = BeahChallenge.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (title != ""):
            challenge.Title = title
        if (image != ""):
            challenge.Image = image
        if (description != ""):
            challenge.Description = description
        if (problem != ""):
            challenge.Problems = problem
        if (solution != ""):
            challenge.Solution = solution
        if (problemRepeat != ""):
            challenge.ProblemRepeat = problemRepeat
        if (problemPlace != ""):
            challenge.Places = problemPlace
        if (negative != ""):
            challenge.Negative = negative
        challenge.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


@api_view(['POST'])
def challengeUpdate(request):
    id = request.data['ID']
    title = request.data['title']
    image = request.data['image']
    description = request.data['description']
    problem = request.data['problem']
    solution = request.data['solution']
    negative = request.data['negative']
    problemRepeat = request.data['problemRepeat']
    problemPlace = request.data['problemPlace']
    subtitle = request.data['subtitle']
    subdescription = request.data['subdescription']
    # print('challengeUpdate id', id)
    try:
        challenge = BeahChallenge.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if subtitle:
             challenge.SubTitle = subtitle
        if subdescription:
             challenge.SubDescription = subdescription
        if (title != ""):
            challenge.Title = title
        if (image != ""):
            challenge.Image = image
        if (description != ""):
            challenge.Description = description
        if (problem != ""):
            challenge.Problems = problem
        if (solution != ""):
            challenge.Solution = solution
        if (problemRepeat != ""):
            challenge.ProblemRepeat = problemRepeat
        if (problemPlace != ""):
            challenge.Places = problemPlace
        if (negative != ""):
            challenge.Negative = negative
        challenge.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


@api_view(['POST'])
def BeahTecUpdate(request):
    if request.method == 'POST':
        desc = request.data['desc']
        checkData = BeahTec.objects.all().exists()
        if checkData:
            getinfo = BeahTec.objects.get(ID=1)
            if (desc != ""):
                getinfo.Description = desc
            if 'image' in request.data:
                image = request.data['image']
                # print('BeahTecUpdate image', image)
                getinfo.Image = image
            getinfo.save()
            return http.HttpResponse('update')

        else:
            if (desc != ""):
                Store_in_BeahTable = BeahTec(
                    Description=desc)
            if 'image' in request.data:
                image = request.data['image']
                # print('BeahTecUpdate image', image)
                Store_in_BeahTable = BeahTec(
                    Image=image)

            Store_in_BeahTable.save()
            return http.HttpResponse('update')


@api_view(['GET'])
def BeahTecDisplay(request):
    if request.method == 'GET':
        Beahtec = BeahTec.objects.all()
        serializer = BeahTecSerializer(Beahtec, many=True)
        Beahjoincondition = BeahJoinConditions.objects.all()
        joinconditionserializer = BeahJoinConditionsSerializer(
            Beahjoincondition, many=True)
        data = {'BeahTec': serializer.data,
                'JoinConditions': joinconditionserializer.data}
        return Response(data)


@api_view(['POST'])
def addPromotionalImages(request):
    if request.method == 'POST':
        ARTitle = request.data['ARTitle']
        ENTitle = request.data['ENTitle']
        image = request.data['image']
        # print('ARTitle', ARTitle, 'ENTitle', ENTitle, 'image', image)
        Store_in_PromotionalImagesTable = BeahPromotionalImages(
            TitleArabic=ARTitle, TitleEnglish=ENTitle, Image=image)
        Store_in_PromotionalImagesTable.save()
        return http.HttpResponse('created')


@api_view(['GET'])
def displayPromotionalImages(request):
    if request.method == 'GET':
        promotionalimages = BeahPromotionalImages.objects.all()
        serializer = PromotionalImagesSerializer(promotionalimages, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def displayPromotionalDetails(request):
    PromotionalID = request.data['PromotionalID']
    # print('id from challenge', id)

    try:
        challenge = BeahChallenge.objects.get(ID=id)
    except challenge.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ChallengesSerializer(challenge)
        # print('serializer', serializer.data)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def addCollege(request):
    if request.method == 'POST':
        data = request.data
        CollegeName = data['CollegeName']
        # print('CollegeName', CollegeName)
        Store_in_BeahTecCollegeTable = BeahTecCollege(
            CollegeName=CollegeName)
        Store_in_BeahTecCollegeTable.save()
        return http.HttpResponse('college')


@api_view(['GET'])
def displayColleges(request):
    if request.method == 'GET':
        Colleges = BeahTecCollege.objects.all()
        serializer = CollegesSerializer(Colleges, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def deleteCollege(request):
    id = request.data['ID']
    # print('deleteCollege', id)
    try:
        CollegeID = BeahTecCollege.objects.get(ID=id)
        # print('CollegeID', CollegeID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        CollegeID.delete()
        return http.HttpResponse('deleted')


@api_view(['GET'])
def CollegeDetails(request, id):
    # print('id from College', id)

    try:
        College = BeahTecCollege.objects.get(ID=id)
    except College.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CollegesSerializer(College)
        # print('serializer', serializer.data)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def CollegeUpdate(request):
    id = request.data['ID']
    CollegeName = request.data['CollegeName']
    # print('Collegepdate id', id)
    try:
        college = BeahTecCollege.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (CollegeName != ""):
            college.CollegeName = CollegeName
        college.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


@api_view(['GET'])
def DisplayColleges_Challenges(request):
    if request.method == 'GET':
        Colleges = BeahTecCollege.objects.filter(Main=True)
        # Colleges = BeahTecCollege.objects.all()
        Collegeserializer = CollegesSerializer(Colleges, many=True)
        Chalenges = BeahChallenge.objects.all()
        Chalengeserializer = ChallengesSerializer(Chalenges, many=True)
        Conditions = BeahJoinConditions.objects.all()
        Conditionsserializer = BeahJoinConditionsSerializer(
            Conditions, many=True)
        data = {'Colleges': Collegeserializer.data,
                'Challenges': Chalengeserializer.data, 'Conditions': Conditionsserializer.data}
        return Response(data)


@api_view(['GET'])
def ContactDisplay(request):
    if request.method == 'GET':
        contact = BeahContact.objects.all()
        serializer = ContactSerializer(contact, many=True)
        data = {'contact': serializer.data}
        return Response(data)


@api_view(['POST'])
def ContactUpdate(request):
    if request.method == 'POST':
        phone = request.data['phone']
        address = request.data['address']
        fromTime = request.data['fromTime']
        toTime = request.data['toTime']
        checkData = BeahContact.objects.all().exists()
        if checkData:
            getinfo = BeahContact.objects.get(ID=1)
            if (phone != ""):
                getinfo.PhoneNum = phone
            if (address != ""):
                getinfo.Address = address
            if (fromTime != ""):
                getinfo.startTime = fromTime
            if (toTime != ""):
                getinfo.EndTime = toTime
            getinfo.save()
            return http.HttpResponse('update')

        else:
            if (phone != ""):
                Store_in_ContactTable = BeahContact(
                    PhoneNum=phone)
            if (address != ""):
                Store_in_ContactTable = BeahContact(
                    Address=address)
            if (fromTime != ""):
                Store_in_ContactTable = BeahContact(
                    startTime=fromTime)
            if (toTime != ""):
                Store_in_ContactTable = BeahContact(
                    EndTime=toTime)
            Store_in_ContactTable.save()
            return http.HttpResponse('update')


@api_view(['GET'])
def Footer_ContactDisplay(request):
    if request.method == 'GET':
        footer = BeahFooter.objects.all()
        fserializer = FooterSerializer(footer, many=True)
        contact = BeahContact.objects.all()
        cserializer = ContactSerializer(contact, many=True)
        data = {'footer': fserializer.data, 'contact': cserializer.data}
        return Response(data)


@api_view(['POST'])
def addAdmin(request):
    if request.method == 'POST':
        data = request.data
        email = data['email']
        loginemail = data['loginEmail']
        password = data['password']
        pass_enc = encrypt(password)
        print(len(pass_enc))
        print('email', email, 'password', pass_enc)
        checkDjangoAdmin = User.objects.filter(email = loginemail).exists()
        if checkDjangoAdmin:
            Store_in_UserTable = BeahUsers(
                UserEmail=email, UserPassword=pass_enc, UserType=0)
            Store_in_UserTable.save()
            sendEmail(user=email, password=password, name="",
                    subject="", custmsg="", status="", callFrom="admin")
            return http.HttpResponse('admin')
        else:
             return http.HttpResponse('privilege')


@api_view(['GET'])
def DisplayAdmin(request,email):
    if request.method == 'GET':
        # print('email from Admin', email)
        getAdmin = BeahUsers.objects.filter(UserType=0)
        adminSerializer = UserSerializer(getAdmin, many=True)
        checkDjangoAdmin = User.objects.filter(email = email).exists()
        if checkDjangoAdmin:
            CheckAdminPrivilege = 1
        else:
             CheckAdminPrivilege = 0
        data = {'admin': adminSerializer.data, 'CheckAdminPrivilege': CheckAdminPrivilege}
        return Response(data)


@api_view(['POST'])
def deleteAdmin(request):
    if request.method == 'POST':
        id = request.data['ID']
        loginemail =  request.data['loginEmail']
        # print('deleteAdmin', id)
        checkDjangoAdmin = User.objects.filter(email = loginemail).exists()
        if checkDjangoAdmin:
            AdminID = BeahUsers.objects.get(ID=id)
            # print('AdminID', AdminID)
            AdminID.delete()
            return http.HttpResponse('deleted')
        else:
             return http.HttpResponse('privilege')


@api_view(['GET'])
def AdminDetails(request, id):
    admins = {}
    # print('id from Admin', id)

    try:
        admin = BeahUsers.objects.get(ID=id)
    except admin.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        UserPassword = decrypt(admin.UserPassword)
        UserEmail = admin.UserEmail
        ID = admin.ID
        # print('UserPassword', UserPassword)
        admins = {'ID': ID, 'UserEmail': UserEmail,
                  'UserPassword': UserPassword}
        return Response(admins)


@api_view(['POST'])
def AdminUpdate(request):
    if request.method == 'POST':
        LoginEmail = request.data['loginEmail']
        id = request.data['ID']
        email = request.data['email']
        password = request.data['password']
        enc_pass = encrypt(password)
        # print('AdminUpdate id', id)
        checkDjangoAdmin = User.objects.filter(email = LoginEmail).exists()
        if checkDjangoAdmin:
            admin = BeahUsers.objects.get(ID=id)
            if (email != ""):
                admin.UserEmail = email
            if (password != ""):
                admin.UserPassword = enc_pass
            admin.save()
            return http.HttpResponse('Updated')
        return http.HttpResponse('privilege')


@api_view(['GET'])
def statisticsONSite(request):
    # getmembers = []
    # getsubjects = []
    # getprojects = []

    visotors = getvisotors()
    allProjects = len(BeahProjects.objects.all())
    teams = BeahTeam.objects.filter(selected=1)
    members = 0
    projects = 0
    subjects = 0
    for team in teams:
        getmembers = BeahMember.objects.filter(TeamID=team)
        getprojects = BeahProjects.objects.filter(TeamID=team)
        if (len(getmembers)>0): members += len(getmembers)
        else: members += 1
        projects += len(getprojects)
        for project in getprojects:
            getsubjects = BeahSubjects.objects.filter(ProjectID=project)
            subjects += len(getsubjects)

    if (members==0): members = projects
    data = {'membersCount': members, "allProjects": allProjects,
            'projectsCount': projects, 'subjectsCount': subjects, 'visitors': visotors}
    return Response(data)


@api_view(['POST'])
def addJoinCondition(request):
    if request.method == 'POST':
        data = request.data
        condition = data['condition']
        # print('condition', condition)
        Store_in_BeahJoinConditionsTable = BeahJoinConditions(
            condition=condition)
        Store_in_BeahJoinConditionsTable.save()
        return http.HttpResponse('condition')


@api_view(['POST'])
def deleteJoinCondition(request):
    id = request.data['ID']
    # print('deleteJoinCondition', id)
    try:
        ConditionID = BeahJoinConditions.objects.get(ID=id)
        # print('PartenerID', ConditionID)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        ConditionID.delete()
        return http.HttpResponse('deleted')


@api_view(['POST'])
def JoinConditionUpdate(request):
    id = request.data['ID']
    updateCondition = request.data['updateCondition']
    # print('JoinConditionUpdate id', id)
    try:
        Joincondition = BeahJoinConditions.objects.get(ID=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if (updateCondition != ""):
            Joincondition.condition = updateCondition
        Joincondition.save()
        return http.HttpResponse('Updated')
    return http.HttpResponse('Not Updated')


def saveAdminNotifications(teamName):
    msg = 'لقد استلمت طلب إنضمام جديد من فريق'+" "+teamName
    admins = BeahUsers.objects.filter(UserType=0)
    DjangoAdmins = User.objects.filter(is_superuser=1)
    if len(admins)>0:
        for admin in admins:
            # print('admin', admin.ID)
            Store_in_AdminNotification = BeahNotifications(
                UserID=admin, message=msg, role='admin')
        Store_in_AdminNotification.save()
        return http.HttpResponse('Save Notification')
    if len(DjangoAdmins)>0:
        for admin in DjangoAdmins:
            # print('admin', id)
            Store_in_AdminNotification = BeahNotifications(
                DjangoID=admin, message=msg, role='admin')
        Store_in_AdminNotification.save()
        return http.HttpResponse('Save Notification')
       


@api_view(['GET'])
def AllAdminNotifications(request):
    notifications = []
    if request.method == 'GET':
        Notifications = BeahNotifications.objects.filter(
            role='admin').order_by('-Date')
        for notify in Notifications:
            id = notify.ID
            msg = notify.message
            msgdate = notify.Date.strftime("%d-%m-%Y")
            msgtime = notify.Date.strftime("%p %H:%M ")
            notifications.append(
                {'id': id, 'msg': msg, 'date': msgdate, 'time': msgtime})
        data = {'notifications': notifications}
        return Response(data)


@api_view(['GET'])
def DisplayIsSeenAdminNotifications(request):
    if request.method == 'GET':
        getNotification = BeahNotifications.objects.filter(
            isSeen=False, role='admin').order_by('-Date')[:10]
        adminNotificationSer = NotificationsSerializer(
            getNotification, many=True)
        data = {'notifications': adminNotificationSer.data,
                'len': len(getNotification)}
        return Response(data)


@api_view(['POST'])
def UpdateAdminNotifications(request):
    notify = []
    if request.method == 'POST':
        id = request.data['ID']
        # print('id from UpdateAdminNotifications',id)
        Notification = BeahNotifications.objects.get(ID=id)
        # print('Notification',Notification)
        msg = Notification.message
        msgdate = Notification.Date.strftime("%d-%m-%Y")
        msgtime = Notification.Date.strftime("%p %H:%M ")
        notify.append({'msg': msg, 'date': msgdate, 'time': msgtime})
        data = {'notify': notify}
        Notification.isSeen = True
        Notification.save()
        return Response(data)
    return http.HttpResponse('Updated')


@api_view(['POST'])
def SendNotification4Team(request):
    if request.method == 'POST':
        projectID = request.data['ID']
        msg = request.data['message']
        # print('projectID', projectID)
        getProject = BeahProjects.objects.get(ID=projectID)
        teamIDInProject = getProject.TeamID_id
        # print('teamIDInProject table', teamIDInProject)
        getteam = BeahTeam.objects.get(ID=teamIDInProject)
        # print('getteam', getteam)
        teamIDInteam = getteam.TeamID_id
        # print('teamIDInteam', getteam)
        getUser = BeahUsers.objects.get(ID=teamIDInteam)
        userEmail = getUser.UserEmail
        # print('getUser', getUser)
        # print('userEmail', userEmail)
        Store_in_BeahNotifications = BeahNotifications(
            UserID=getUser, message=msg, role='team')
        Store_in_BeahNotifications.save()
        sendEmail(user=userEmail, password="", name="",
                  subject="", custmsg=msg, status="", callFrom="Send")
    return http.HttpResponse('send')


@api_view(['GET'])
def TeamNotifyISSeen(request, email):
    if request.method == 'GET':
        # print('email from TeamNotifyISSeen', email)
        getuserInfo = BeahUsers.objects.get(UserEmail=email)
        # print('getuserInfo from TeamNotifyISSeen', getuserInfo)
        getNotification = BeahNotifications.objects.filter(
            isSeen=False, UserID=getuserInfo).order_by('-Date')[:10]
        teamNotificationSer = NotificationsSerializer(
            getNotification, many=True)
        data = {'notifications': teamNotificationSer.data,
                'len': len(getNotification)}
        return Response(data)

    return http.HttpResponse('send')


@api_view(['GET'])
def AllteamNotifications(request, email):
    notifications = []
    if request.method == 'GET':
        getuserInfo = BeahUsers.objects.get(UserEmail=email)
        Notifications = BeahNotifications.objects.filter(
            UserID=getuserInfo).order_by('-Date')
        for notify in Notifications:
            id = notify.ID
            msg = notify.message
            msgdate = notify.Date.strftime("%d-%m-%Y")
            msgtime = notify.Date.strftime("%p %H:%M ")
            notifications.append(
                {'id': id, 'msg': msg, 'date': msgdate, 'time': msgtime})
        data = {'notifications': notifications}
        return Response(data)


@api_view(['POST'])
def checkIfEmailExit(request):
    if request.method == 'POST':
        checkemail = False
        checkCode = False
        email = request.data['email']
        # print('email from checkIfEmailExit', email)
        checkDjango = User.objects.filter(email = email).exists()
        checUser = BeahUsers.objects.filter(UserEmail = email).exists()
        checkVisitor = BeahVisitors.objects.filter(UserEmail=email).exists()
        if checUser:
            checkemail = BeahUsers.objects.get(UserEmail=email)
            teams = BeahTeam.objects.get(TeamID=checkemail)
            isSelected = teams.selected
            if (isSelected==1):
                userID = checkemail.ID
                # print('userID checkemail',userID)
                randomCode = get_random_string()
                # print('email from randomCode', randomCode)
                try:
                    checkCode = BeahRandomCode.objects.get(UserID=userID)
                except:
                    pass
                if checkCode:
                    checkCode.randomCode = randomCode
                    checkCode.Date = datetime.now()
                    checkCode.save()
                else:
                    Store_in_BeahRandomCode = BeahRandomCode(
                        UserID=checkemail, randomCode=randomCode, Date=datetime.now())
                    Store_in_BeahRandomCode.save()
                sendEmail(user=email, password="", name="",
                            subject="", custmsg=randomCode, status="", callFrom="Rcode")
                data = {'msg': 'send2email', 'user': userID}
                # print('data',data)
                return Response(data)
            else:
                return http.HttpResponse('wrongEmail') 
        elif checkDjango:
            checkemail = User.objects.get(email=email)
            userID = checkemail.id
            # print('userID checkDjango',userID)
            randomCode = get_random_string()
            # print('email from randomCode', randomCode)
            try:
                checkCode = BeahRandomCode.objects.get(DjangoID=userID)
            except:
                pass
            if checkCode:
                checkCode.randomCode = randomCode
                checkCode.Date = datetime.now()
                checkCode.save()
            else:
                Store_in_BeahRandomCode = BeahRandomCode(
                    DjangoID=checkemail, randomCode=randomCode, Date=datetime.now())
                Store_in_BeahRandomCode.save()
            sendEmail(user=email, password="", name="",
                        subject="", custmsg=randomCode, status="", callFrom="Rcode")
            data = {'msg': 'send2email', 'user': userID}
            # print('data',data)
            return Response(data)
        elif checkVisitor:
            checkemail = BeahVisitors.objects.get(UserEmail=email)
            userID = checkemail.id
            # print('userID checkVisitor',userID)
            randomCode = get_random_string()
            # print('email from randomCode', randomCode)
            try:
                checkCode = BeahRandomCode.objects.get(visitorID=userID)
            except:
                pass
            if checkCode:
                checkCode.randomCode = randomCode
                checkCode.Date = datetime.now()
                checkCode.save()
            else:
                Store_in_BeahRandomCode = BeahRandomCode(
                    visitorID=checkemail, randomCode=randomCode, Date=datetime.now())
                Store_in_BeahRandomCode.save()
            sendEmail(user=email, password="", name="",
                        subject="", custmsg=randomCode, status="", callFrom="Rcode")
            data = {'msg': 'send2email', 'user': userID}
            # print('data',data)
            return Response(data)
        else:
            return http.HttpResponse('wrongEmail')  
   

@api_view(['POST'])
def ResendCode(request):
    if request.method == 'POST':
        user = request.data['userid']
        email = request.data['email']
        checkDjango = User.objects.filter(id = user).exists()
        checUser = BeahUsers.objects.filter(ID = user).exists()
        checkVisitor = BeahVisitors.objects.filter(ID=user).exists()
        if checkDjango:
            checkCode = BeahRandomCode.objects.get(DjangoID=user)
        if checUser:
            checkCode = BeahRandomCode.objects.get(UserID=user)
        if checkVisitor:
            checkCode = BeahRandomCode.objects.get(visitorID=user)
        # checkCode = BeahRandomCode.objects.get(UserID=user)
        if checkCode:
            randomCode = get_random_string()
            checkCode.randomCode = randomCode
            checkCode.Date = datetime.now()
            checkCode.save()
            sendEmail(user=email, password="", name="",
                      subject="", custmsg=randomCode, status="", callFrom="Rcode")
            return http.HttpResponse('send')


@api_view(['POST'])
def checkCorrectCode(request):
    if request.method == 'POST':
        currenttime = datetime.now()
        user = request.data['userid']
        # print('checkCorrectCode for reset password user',user)
        code = request.data['code']
        checkDjango = User.objects.filter(id = user).exists()
        checUser = BeahUsers.objects.filter(ID = user).exists()
        checkVisitor = BeahVisitors.objects.filter(ID=user).exists()
        if checkDjango:
            checkCode = BeahRandomCode.objects.get(DjangoID=user)
        if checUser:
            checkCode = BeahRandomCode.objects.get(UserID=user)
        if checkVisitor:
            checkCode = BeahRandomCode.objects.get(visitorID=user)
        if checkCode:
            if code == checkCode.randomCode:
                codedate = checkCode.Date
                duration = currenttime - codedate
                minutes = duration.total_seconds() / 60.0
                # print('minutes', minutes)
                if minutes > 5:
                    return http.HttpResponse('expired')
                else:
                    return http.HttpResponse('success')
            else:
                return http.HttpResponse('wrongCode')


@api_view(['POST'])
def ResetPassword(request):
    if request.method == 'POST':
        user = request.data['userid']
        # print('user from ResetPassword',user)
        password = request.data['password']
        # print('from reset password ',password)
        confirmpassword = request.data['confirmpassword']
        checkDjango = User.objects.filter(id = user).exists()
        checUser = BeahUsers.objects.filter(ID = user).exists()
        checkVisitor = BeahVisitors.objects.filter(ID=user).exists()
        if checkDjango:
             getuser = User.objects.get(id=user)
             if password == confirmpassword:
                enc_pass = encrypt(password)
                # print('from reset password enc_pass',enc_pass)
                getuser.set_password(password)  
                getuser.save()
                return http.HttpResponse('resetpassword')
        elif checUser:
            getuser = BeahUsers.objects.get(ID=user)
            if password == confirmpassword:
                enc_pass = encrypt(password)
                # print('from reset password enc_pass',enc_pass)
                getuser.UserPassword = enc_pass
                getuser.save()
                return http.HttpResponse('resetpassword')
        elif checkVisitor:
            getuser = BeahVisitors.objects.get(ID=user)
            if password == confirmpassword:
                enc_pass = encrypt(password)
                # print('from reset password enc_pass',enc_pass)
                getuser.UserPassword = enc_pass
                getuser.save()
                return http.HttpResponse('resetpassword')
        else:
            return http.HttpResponse('notIdentical')


        # getDjangoUser = User.objects.filter(
        #     UserID=getuserInfo).order_by('-Date')
        # getuser = BeahUsers.objects.get(ID=user)
        # if getuser:
        #     if password == confirmpassword:
        #         enc_pass = encrypt(password)
        #         # print('from reset password enc_pass',enc_pass)
        #         getuser.UserPassword = enc_pass
        #         getuser.save()
        #         return http.HttpResponse('resetpassword')
        #     else:
        #         return http.HttpResponse('notIdentical')


@api_view(['GET'])
def adminStatistics(request):
    if request.method == 'GET':
        adminstatistics = []
        subjects = BeahSubjects.objects.all()
        for subject in subjects:
            subjectname = subject.SubjectName
            subjectid = subject.ID
            projectid = subject.ProjectID_id
            getproject = BeahProjects.objects.get(ID=projectid)
            TeamID = getproject.TeamID_id
            getteam = BeahTeam.objects.get(ID=TeamID)
            teamName = getteam.TeamName
            likeCount = BeahSubjectsLike.objects.filter(SubjectID=subjectid)
            commentCount = BeahSubjectsComments.objects.filter(
                SubjectID=subjectid)
            adminstatistics.append({'subjectname': subjectname, 'teamName': teamName,
                                    'likeCount': str(len(likeCount)), 'commentCount': str(len(commentCount))})
            # print('adminstatistics :', adminstatistics)
        return Response(adminstatistics)

@api_view(['GET'])
def checkSuperAdmin(request,email):
    if request.method == 'GET':
        loginEmail = email
        # print('loginEmail',loginEmail)
        user = User.objects.filter(email=email).first()
        if user:
            CheckDjangoAdmin =1
            # print('CheckDjangoAdmin',CheckDjangoAdmin)
        else:
            CheckDjangoAdmin =0
            # print('CheckDjangoAdmin',CheckDjangoAdmin)
        data = {'CheckDjangoAdmin':CheckDjangoAdmin}
        return Response(data)


@api_view(['GET'])
def checkIfProjects(request):
    if request.method == 'GET':
        ifProject = BeahProjects.objects.all()
        if ifProject :
            ProjectExit =1
            print('ProjectExit',ProjectExit)
        else:
            ProjectExit =0
            print('ProjectExit',ProjectExit)
        data = {'ProjectExit':ProjectExit}
        return Response(data)


@api_view(['POST'])
def TeamUploadLogo(request):
    if request.method == 'POST':
        id = request.data['ID']
        if 'image' in request.data:
            image = request.data['image']
            print(image)
        else:
            image = None
        if (image):
            team = BeahTeam.objects.get(ID=id)
            print(team)
            team.TeamLogo = image
            team.save()
            return http.HttpResponse('1')

@api_view(['GET'])
def getTeams2Vote(request):
    teamInfo =[]
    maxTeam =[]
    minTeam =[]
    if request.method == 'GET':
        teams = BeahTeam.objects.filter(UserStatus=0)
        for team in teams:
            project = BeahProjects.objects.get(TeamID=team)
            checkVote=BeahTeamVote.objects.filter(TeamID=team)
            teamInfo.append({'teamID': team.ID, 
            'teamName': team.TeamName,
            'TeamLogo': str(team.TeamLogo),
            'ProjectName': project.ProjectName,
            'projectLogo':  str(project.projectLogo),
            'projectID':  str(project.ID),
            "VoteNum":len(checkVote)
           })
        #sort team with the most number of vote 
        newlist = sorted(teamInfo, key=itemgetter('VoteNum'),reverse=True)
        print('newlist',newlist)
        print('maxteam',newlist[0]['teamName'],newlist[0]['VoteNum'])
        print('maxteam',newlist[-1]['teamName'],newlist[-1]['VoteNum'])
        maxTeam.append({'teamName':newlist[0]['teamName'],'VoteNum':newlist[0]['VoteNum']})
        minTeam.append({'teamName':newlist[-1]['teamName'],'VoteNum':newlist[-1]['VoteNum']})
        data = {'newlist':newlist,'maxTeam':maxTeam,'minTeam':minTeam}
        return Response(data)
        # return Response(newlist,maxTeam,minTeam)

def generateOTP():
    digits = "0123456789"
    OTP = ""
    for i in range(4) :
        OTP += digits[math.floor(random.random() * 10)]
    return OTP

# def sendOTP(otp,phone):
#     # Set environment variables for your credentials
#     # Read more at http://twil.io/secure
#     account_sid = "AC7ecea9907bb8942383bb63ccb4193aba"
#     auth_token = "72adbc8bc320d59cf8173d1af565b70f"
#     client = Client(account_sid, auth_token)
#     msg =""
#     try:
#         message = client.messages.create(
#         body= otp,
#         from_="+18434273923",
#         to="+968"+phone
#         )
#         msg = message.sid
#     except:pass
#     return msg

def sendOTP__(otp, phone):
    import requests
    url = 'https://api.easysendsms.app/bulksms'
    sender_id = "info"
    # sender_id = "96897377800"
    phone_number = "968" + phone
    msg = "Your OTP for beah-tec : " + str(otp)
    url += '?username=abduev.dphuu82023&password=DEVELOPer@EV2011&from=' + sender_id + '&to=' + phone_number + '&text=' + msg + '&type=0'
    x = requests.get(url)
    try:
        print(x.text)
        response = x.text
        res_status = response.split(":")[0]
        if (str(res_status)=="OK"):
            return True
    except: 
        return False
    return False

def sendOTP(otp, phone):
    # http://96.9.140.37:5500/otp/?phone=94662442&otp=3442
    import requests
    # url = 'http://96.9.140.37:5555/otp/'
    url = 'http://96.9.140.37/otp'
    msg = "Your OTP for beah-tec : " + str(otp)
    url += '?phone=' + phone + '&sms=' + msg
    try:
        x = requests.get(url)
        print(x.text)
        response = x.text
        print("sms response : " , response)
        if (str(response)=="1"):
            return True
        else:
            return False
    except Exception as e: 
        print(e)
        return False
    return False

def sendOTPEmail(otp, phone):
    # http://96.9.140.37:5500/otp/?phone=94662442&otp=3442
    import requests
    url = 'http://96.9.140.37:5555/otp/'
    msg = "Your OTP for beah-tec : " + str(otp)
    url += '?phone=' + phone + '&sms=' + msg
    try:
        x = requests.get(url)
        print(x.text)
        response = x.text
        print("sms response : " , response)
        if (str(response)=="1"):
            return True
        else:
            return False
    except Exception as e: 
        print(e)
        return False
    return False


@api_view(['POST'])
def RecievePhoneNum(request):
    if request.method == 'POST':
        if (VoteTimeDownFinish()):
            return Response(-2)
        phone = request.data['phone']
        phone = convert_numbers.hindi_to_english(phone)
        # token = request.data['token']
        # if (token == 'WeAreReady'):
        print('phone re',phone)
        # checkPhone = BeahTeamVote.objects.filter(Phone=phone).exists()
        try:
            checkPhone = BeahTeamVote.objects.get(Phone=phone)
            if (checkPhone):
                print("team id : ",checkPhone.TeamID_id)
                try:
                    print("team : ",checkPhone.TeamID)
                except Exception as e:
                    print(e)
                if(checkPhone.TeamID_id):
                    print('Response(0)')
                    return Response(0)
                else:
                    # checkPhone.TeamID_id
                    BeahTeamVote.objects.filter(Phone=phone).delete()
        except Exception as e: 
            print(phone , "  " , e)
            if ('get() returned more than one BeahTeamVote' in str(e)):
                return Response(0)

        # print('checkPhone',checkPhone)
        # if checkPhone == False:
        otp = generateOTP()
        print('otp: ',otp)
        checksend = sendOTP(otp, phone)
        print('checksend: ',checksend)
        if (checksend):
                Store_in_BeahTeamVote = BeahTeamVote(
                Phone=phone, OTP=otp)
                Store_in_BeahTeamVote.save()
                lastPhone = BeahTeamVote.objects.last()
                LastPhoneStoreID =lastPhone.ID
                print(phone , " : " , otp ," : " , LastPhoneStoreID)
                return Response(LastPhoneStoreID)
        else: 
            emails = "ev.developers@gmail.com"
            sendAlertEmail(emails)
            return Response(-1)
        # else:
        #     print('Response(0)')
        #     return Response(0)

@api_view(['POST'])
def RecieveEmail(request):
    if request.method == 'POST':
        phone = request.data['phone']
        # phone = convert_numbers.hindi_to_english(phone)
        # token = request.data['token']
        # if (token == 'WeAreReady'):
        # print('phone re',phone)
        # checkPhone = BeahTeamVote.objects.filter(Phone=phone).exists()
        try:
            checkPhone = BeahTeamVote.objects.get(Phone=phone)
            if (checkPhone):
                if(checkPhone.TeamID_id):
                    print('Response(0)')
                    return Response(0)
                else:
                    BeahTeamVote.objects.filter(Phone=phone).delete()
        except: pass

        # print('checkPhone',checkPhone)
        # if checkPhone == False:
        otp = generateOTP()
        print('otp: ',otp)
        checksend = sendOTPEmail(phone, otp)
        print('checksend: ',checksend)
        if (checksend):
                Store_in_BeahTeamVote = BeahTeamVote(
                Phone=phone, OTP=otp)
                Store_in_BeahTeamVote.save()
                lastPhone = BeahTeamVote.objects.last()
                LastPhoneStoreID =lastPhone.ID
                print(phone , " : " , otp ," : " , LastPhoneStoreID)
                return Response(LastPhoneStoreID)
        else: 
            emails = "ev.developers@gmail.com"
            sendAlertEmail(emails)
            return Response(-1)
        # else:
        #     print('Response(0)')
        #     return Response(0)


@api_view(['POST'])
def ResendOTP(request):
    if request.method == 'POST':
       phoneID = request.data['LastPhoneAddedID']
       getobj = BeahTeamVote.objects.get(ID=phoneID)
       phoneNumber=getobj.Phone
       print('phoneID from',phoneNumber)
       if (getobj.TeamID):
            return Response(0)
       else:
            otp = generateOTP()
            print('otp',otp)
            checksend = sendOTP(otp,phoneNumber)
            if checksend:
                    getobj.OTP=otp
                    getobj.save()
                    return Response(1)
            else:
                    return Response(0)
    
@api_view(['POST'])
def ResendOTPEmail(request):
    if request.method == 'POST':
       phoneID = request.data['LastPhoneAddedID']
       getobj = BeahTeamVote.objects.get(ID=phoneID)
       phoneNumber=getobj.Phone
       print('phoneID from',phoneNumber)
       otp = generateOTP()
       print('otp',otp)
       checksend = sendOTPEmail(phoneNumber, otp)
       if checksend:
            getobj.OTP=otp
            getobj.save()
            return Response(1)
    

@api_view(['POST'])
def CheckOTP2Vote(request):
     if request.method == 'POST':
        if(VoteTimeDownFinish()):
            return Response("0")
            
        OTP = request.data['OTP']
        TeamID = request.data['TeamID']
        phoneID = request.data['LastPhoneAddedID']
        checkPhone = BeahTeamVote.objects.filter(ID=phoneID).exists()
        if checkPhone:
            getOject = BeahTeamVote.objects.get(ID=phoneID)
            getOtp = getOject.OTP
            if getOtp == OTP:
                print("vote TeamID : " ,TeamID)
                if (TeamID):
                    getTeam = BeahTeam.objects.get(ID=TeamID)
                    print("vote getTeam : " ,getTeam)
                    if (getTeam):
                        getOject.TeamID=getTeam
                        getOject.save()
                        TeamName =  getTeam.TeamName
                        print('TeamName',TeamName)
                        put_votes_data_google_sheet()
                        return Response(TeamName)
            else:
                return Response("0")
        
        return Response("0")


@api_view(['POST'])
def getVotes(request):
     if request.method == 'POST':
        NoVotes = BeahTeamVote.objects.filter(TeamID=None)
        allVotes = BeahTeamVote.objects.all()
        votes = len(allVotes) - len(NoVotes) 
        print("votes : ", votes)

        return Response(str(votes))
 

@api_view(['POST'])
def votedeadline(request):
     if request.method == 'POST':
        finish = VoteTimeDownFinish()
        if (finish): return Response("1")
        else: return Response("0")