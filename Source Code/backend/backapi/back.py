import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "../beahProject.settings")

from datetime import datetime
import json
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
from time import sleep

############################################

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



while True:
    print("putting projects data google sheet ,,,")
    put_projects_data_google_sheet()
    sleep(60)