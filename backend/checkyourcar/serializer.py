from rest_framework import serializers

from checkyourcar.models import Car, User, Issue


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('make', 'model', 'year', 'issues')


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ('id', 'name', 'description')
