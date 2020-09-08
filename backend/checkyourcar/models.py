from django.db import models

class Car(models.Model):
    carID = models.IntegerField("Unique Car Identifier", primary_key=True)
    make = models.CharField("Make/Brand of the car",unique=True, max_length=100)
    model = models.CharField("Model name of the car", max_length=100)
    year = models.IntegerField("Year of car model")

class Recall(models.Model):
    recallID = models.IntegerField("Unique Recall Identifier", primary_key=True)


class Issue(models.Model):
    issueID = models.IntegerField("Unique Issue Identifier", primary_key=True)
    name = models.CharField("Issue Name", max_length=100)
    description = models.CharField("Description of the issue", max_length=3000)


class User(models.Model):
    userID = models.IntegerField("Unique User Identifier", primary_key=True)
    name = models.CharField("User's First & Last Name", max_length=100)
    mobile = models.IntegerField("User's mobile number", unique=True, blank=True)
    email = models.CharField("User's email address", max_length=100, unique=True)
    country = models.CharField("User's country", max_length=100)
    postcode = models.IntegerField("User's postcode")
    #cars = models.ManyToManyField("Car", blank=True)



