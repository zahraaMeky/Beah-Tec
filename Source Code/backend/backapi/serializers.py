from rest_framework import serializers
from .models import *


class articleSerializer(serializers.ModelSerializer):
    CreatedDate = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = BeahArticles
        fields = '__all__'


class projectSerializer(serializers.ModelSerializer):
    publishDate = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = BeahProjects
        fields = '__all__'


class teamSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahTeam
        fields = '__all__'


class memberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahMember
        fields = '__all__'


class subjectSerializer(serializers.ModelSerializer):
    publishDate = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = BeahSubjects
        fields = '__all__'


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahFooter
        fields = '__all__'


class PartenerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahPartener
        fields = '__all__'


class ChallengesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahChallenge
        fields = '__all__'


class BeahTecSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahTec
        fields = '__all__'


class PromotionalImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahPromotionalImages
        fields = '__all__'


class CollegesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahTecCollege
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahContact
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahUsers
        fields = '__all__'


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeahNotifications
        fields = '__all__'


class BeahJoinConditionsSerializer(serializers.ModelSerializer):
    Date = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = BeahJoinConditions
        fields = '__all__'
