from django.db import models



class Car(models.Model):
    id = models.IntegerField("Unique Identifier", primary_key=True)
    make = models.CharField("Make", max_length=100)
    model = models.CharField("Model", max_length=100)
    year = models.IntegerField("Year")
    issues = models.ManyToManyField("Issue", blank=True)

    def __unicode__(self):
        return self.id


class Issue(models.Model):
    id = models.IntegerField("Unique Identifier", primary_key=True)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description of the issue", max_length=3000)
    recall = models.BooleanField("Recall Status")
    notification = models.BooleanField("Notification Status")

    def __unicode__(self):
        return self.id


class User(models.Model):
    id = models.IntegerField("Unique Identifier", primary_key=True)
    name = models.CharField("First & Last Name", max_length=100)
    mobile = models.IntegerField("Mobile number", unique=True, blank=True)
    email = models.CharField("Email address", max_length=100, unique=True)
    country = models.CharField("Country", max_length=100)
    postcode = models.IntegerField("Postcode")
    cars = models.ManyToManyField("Car", blank=True)

    def __unicode__(self):
        return self.id

