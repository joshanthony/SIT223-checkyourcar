from rest_framework import serializers
from checkyourcar.models import Car, User, Issue

class CarSerializer(serializers.ModelSerializer):
    # issues = IssueSerializer(many=True)
    class Meta:
        model = Car
        fields = ('make', 'model', 'year')

class IssueSerializer(serializers.ModelSerializer):
    cars = CarSerializer(many=True, read_only=True)
    class Meta:
        model = Issue
        fields = ('id', 'name', 'description', 'cars')
    