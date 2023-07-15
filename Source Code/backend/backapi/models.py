from pydoc import describe
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
ADMIN = 0
TEAM = 1
SUPPORT = 2

USER_TYPE_CHOICES = (
    (ADMIN, "Admin"),
    (TEAM, "Team"),
    (SUPPORT, "Support"),
)
APPROVED = 0
NOTAPPROVED = 1


USER_STATUS_CHOICES = (
    (APPROVED, "Approved"),
    (NOTAPPROVED, "Not Approved"),

)


class BeahUsers(models.Model):
    ID = models.AutoField(primary_key=True)
    UserEmail = models.CharField(max_length=100)
    UserPassword = models.CharField(max_length=350)
    UserType = models.IntegerField(choices=USER_TYPE_CHOICES)


class BeahVisitors(models.Model):
    ID = models.AutoField(primary_key=True)
    UserEmail = models.CharField(max_length=100)
    UserPassword = models.CharField(max_length=150, null=True, blank=True)
    IsActive=models.BooleanField(default=0)


class BeahTecCollege(models.Model):
    ID = models.AutoField(primary_key=True)
    CollegeName = models.CharField(max_length=200)
    Main = models.BooleanField(default=True)

    
class BeahTeam(models.Model):
    ID          = models.AutoField(primary_key=True)
    TeamID      = models.ForeignKey(BeahUsers, on_delete=models.CASCADE)
    TeamName    = models.CharField(max_length=100)
    CollegeName = models.ForeignKey(BeahTecCollege, on_delete=models.CASCADE)
    JoinDate    = models.DateTimeField(auto_now_add=True, blank=True)
    MemberNum   = models.CharField(max_length=100)
    PhoneNum    = models.CharField(max_length=100)
    UserStatus  = models.IntegerField(choices=USER_STATUS_CHOICES)
    selected    = models.IntegerField(default=0)   
    TeamLogo    = models.ImageField(upload_to='TeamsLogo', default=None, null=True) 

class BeahMember(models.Model):
    ID = models.AutoField(primary_key=True)
    MemberName = models.CharField(max_length=100)
    MemberMajor = models.CharField(max_length=100)
    MemberDescription = models.TextField()
    MemberImage = models.ImageField(upload_to='MemberImage')
    MemberGender = models.CharField(max_length=20)
    MemberStudyYear = models.CharField(max_length=50)
    TeamID = models.ForeignKey(BeahTeam, on_delete=models.CASCADE)


# class BeahChallenge(models.Model):
#     ID = models.AutoField(primary_key=True)
#     Title = models.CharField(max_length=200)
#     Image = models.ImageField(upload_to='Challenge')
#     Description = models.TextField(null=True, blank=True)
#     Problems = models.TextField(null=True, blank=True)
#     Negative = models.TextField(null=True, blank=True)
#     Solution = models.TextField(null=True, blank=True)
#     ProblemRepeat = models.TextField(null=True, blank=True)
#     Places = models.TextField(null=True, blank=True)

class BeahChallenge(models.Model):
    ID = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=200,)
    SubTitle = models.CharField(max_length=200,null=True, blank=True)
    Image = models.ImageField(upload_to='Challenge')
    Description = models.TextField(default='')
    SubDescription = models.TextField(null=True, blank=True)
    Problems = models.TextField(null=True, blank=True)
    Negative = models.TextField(null=True, blank=True)
    Solution = models.TextField(null=True, blank=True)
    ProblemRepeat = models.TextField(null=True, blank=True)
    Places = models.TextField(null=True, blank=True)


class BeahProjects(models.Model):
    ID = models.AutoField(primary_key=True)
    ProjectName = models.CharField(max_length=300)
    ProjectProblem = models.ForeignKey(BeahChallenge, on_delete=models.CASCADE)
    TeamID = models.ForeignKey(BeahTeam, on_delete=models.CASCADE)
    ProjectDescription = models.TextField()
    ProjectProposal = models.FileField(upload_to='Proposal')
    projectLogo = models.ImageField(upload_to='projectsLogo')
    publishDate = models.DateTimeField(auto_now_add=True, blank=True)
    selected = models.IntegerField(default=0)

    class Meta:
        ordering = ['-publishDate']


PUBLIC = 0
PRIVATE = 1

SUBJECTS_STATUS_CHOICES = (
    (PUBLIC, "public"),
    (PRIVATE, "private"),

)


class BeahSubjects(models.Model):
    ID = models.AutoField(primary_key=True)
    SubjectName = models.CharField(max_length=100,blank=True, null=True, default="")
    SubjectDescription = models.TextField()
    ProjectID = models.ForeignKey(BeahProjects, on_delete=models.CASCADE)
    publishDate = models.DateTimeField(auto_now_add=True, blank=True)
    SubjectStatus = models.IntegerField(choices=SUBJECTS_STATUS_CHOICES)


class BeahSubjectsImages(models.Model):
    ID = models.AutoField(primary_key=True)
    SubjectImage = models.ImageField(upload_to='Subjects')
    SubjectID = models.ForeignKey(BeahSubjects, on_delete=models.CASCADE)


class BeahSubjectsComments(models.Model):
    ID = models.AutoField(primary_key=True)
    Comments = models.TextField()
    Date = models.DateTimeField(auto_now_add=True, blank=True)
    SubjectID = models.ForeignKey(BeahSubjects, on_delete=models.CASCADE)
    UserID = models.ForeignKey(
        BeahUsers, on_delete=models.CASCADE, blank=True, null=True, default="")
    visitorID = models.ForeignKey(
        BeahVisitors, on_delete=models.CASCADE, blank=True, null=True, default="")
    DjangoID = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, default="")


class BeahSubjectsLike(models.Model):
    LikeID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(
        BeahUsers, on_delete=models.CASCADE, blank=True, null=True, default="")
    visitorID = models.ForeignKey(
        BeahVisitors, on_delete=models.CASCADE, blank=True, null=True, default="")
    SubjectID = models.ForeignKey(BeahSubjects, on_delete=models.CASCADE)
    DjangoID = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, default="")


PUBLIC = 0
PRIVATE = 1

ARTICLES_STATUS_CHOICES = (
    (PUBLIC, "public"),
    (PRIVATE, "private"),

)


class BeahArticles(models.Model):
    ID = models.AutoField(primary_key=True)
    ArticleTitle = models.CharField(max_length=200)
    ArticleDescription = models.TextField()
    # AdminID = models.ForeignKey(BeahUsers, on_delete=models.CASCADE)
    ArticleImage = models.ImageField(upload_to='Articles')
    ArticleStatus = models.IntegerField(choices=ARTICLES_STATUS_CHOICES)
    CreatedDate = models.DateTimeField(auto_now_add=True, blank=True)

    class Meta:
        ordering = ['-CreatedDate']


class BeahFooter(models.Model):
    ID = models.IntegerField(primary_key=True, default=1)
    facebookLink = models.URLField(max_length=200, null=True, blank=True)
    TwiterLink = models.URLField(max_length=200, null=True, blank=True)
    LinkedinLink = models.URLField(max_length=200, null=True, blank=True)
    InstagramLink = models.URLField(max_length=200, null=True, blank=True)
    Conditions = models.TextField(null=True, blank=True)
    Privacy = models.TextField(null=True, blank=True)


class BeahPartener(models.Model):
    ID = models.AutoField(primary_key=True)
    URl = models.URLField(max_length=200, null=True, blank=True)
    Image = models.ImageField(upload_to='Partener')


class BeahJoinConditions(models.Model):
    ID = models.AutoField(primary_key=True)
    condition = models.TextField(max_length=400)


class BeahTec(models.Model):
    ID = models.IntegerField(primary_key=True, default=1)
    Description = models.TextField()
    Image = models.ImageField(upload_to='BeahTec')


class BeahPromotionalImages(models.Model):
    ID = models.AutoField(primary_key=True)
    TitleArabic = models.CharField(max_length=200)
    TitleEnglish = models.CharField(max_length=200)
    Image = models.ImageField(upload_to='Promotional')


class BeahContact(models.Model):
    ID = models.IntegerField(primary_key=True, default=1)
    PhoneNum = models.TextField(max_length=200, null=True, blank=True)
    Address = models.TextField(max_length=200, null=True, blank=True)
    startTime = models.TextField(max_length=200, null=True, blank=True)
    EndTime = models.TextField(max_length=200, null=True, blank=True)


class BeahNotifications(models.Model):
    ID = models.AutoField(primary_key=True)
    message = models.TextField(max_length=300)
    Date = models.DateTimeField(auto_now_add=True, blank=True)
    isSeen = models.BooleanField(default=False)
    role = models.TextField(max_length=10)
    UserID = models.ForeignKey(
        BeahUsers, on_delete=models.CASCADE,blank=True, null=True, default="")
    DjangoID = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, default="")

    class Meta:
        ordering = ['-Date']


class BeahRandomCode(models.Model):
    ID = models.AutoField(primary_key=True)
    randomCode = models.CharField(max_length=100)
    Date = models.DateTimeField(auto_now_add=True)
    UserID = models.ForeignKey(
        BeahUsers, on_delete=models.CASCADE, blank=True, null=True, default="")
    visitorID = models.ForeignKey(
        BeahVisitors, on_delete=models.CASCADE, blank=True, null=True, default="")
    DjangoID = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, default="")


class BeahTeamVote(models.Model):
    ID = models.AutoField(primary_key=True)
    Phone = models.TextField(max_length=8)
    OTP = models.TextField(max_length=6)
    Date = models.DateTimeField(auto_now_add=True)
    Active = models.IntegerField(default=0)
    TeamID = models.ForeignKey(
        BeahTeam, on_delete=models.CASCADE, blank=True, null=True, default="")
  
