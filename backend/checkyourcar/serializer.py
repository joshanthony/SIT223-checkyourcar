from rest_framework import serializers
from checkyourcar.models import Car, Issue
from django.contrib.auth.models import User

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

class UserSerializer(serializers.ModelSerializer):
    # issues = IssueSerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'email', 'username')

class UserCarSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    issues = IssueSerializer(many=True)
    class Meta:
        model = Car
        fields = ('id', 'make', 'model', 'year', 'users','issues')

    def update(self, instance, validated_data):
        current_user = self.context['request'].user
        users_data = [current_user]
        instance.users.add(*users_data)
        instance.save()
        return instance

class RemoveUserCarSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    issues = IssueSerializer(many=True)
    class Meta:
        model = Car
        fields = ('id', 'make', 'model', 'year', 'users','issues')

    def update(self, instance, validated_data):
        current_user = self.context['request'].user
        users_data = [current_user]
        instance.users.remove(*users_data)
        instance.save()
        return instance