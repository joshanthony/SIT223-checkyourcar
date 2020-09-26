from django.db import models
from django.contrib.auth.models import User as RestUser

class Car(models.Model):
    id = models.AutoField("Unique Identifier", primary_key=True)
    make = models.CharField("Make", max_length=100)
    model = models.CharField("Model", max_length=100)
    year = models.IntegerField("Year")
    issues = models.ManyToManyField("Issue", blank=True)
    users = models.ManyToManyField(RestUser)

    def __unicode__(self):
        return self.id

class Issue(models.Model):
    id = models.AutoField("Unique Identifier", primary_key=True)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description of the issue", max_length=3000)
    recall = models.BooleanField("Recall Status")
    notification = models.BooleanField("Notification Status")

    def __unicode__(self):
        return self.id

