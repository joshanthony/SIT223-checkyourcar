from django.shortcuts import render
from tablib import Dataset
from checkyourcar.resources import CarResources, IssueResources
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, Filter
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from checkyourcar.serializer import CarSerializer, IssueSerializer, UserCarSerializer
from checkyourcar.models import Car, Issue
from django.contrib.auth.models import User
from django.db.models import Prefetch

# Filters

# Views
class CarList(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class CarSearch(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('make', 'model', 'year')

class IssueSearch(ListAPIView):
    # queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    filter_backends = [DjangoFilterBackend]
    # filter_class = IssueFilter
    # filter_fields = ('make', 'model', 'year')

    def get_queryset(self):
        queryset = Issue.objects.all()
        make = self.request.query_params.get('make', None)
        model = self.request.query_params.get('model', None)
        year = self.request.query_params.get('year', None)
        if make is not None and model is not None and year is not None:
            queryset = queryset.filter(car__make=make, car__model=model, car__year=year)
        elif make is not None and model is not None and year is None:
            queryset = queryset.filter(car__make=make, car__model=model)
        elif make is not None and model is None and year is not None:
            queryset = queryset.filter(car__make=make, car__year=year)
        elif make is None and model is not None and year is not None:
            queryset = queryset.filter(car__model=model, car__year=year)
        elif make is not None and model is None and year is None:
            queryset = queryset.filter(car__make=make)
        elif make is None and model is not None and year is None:
            queryset = queryset.filter(car__model=model)
        elif make is None and model is None and year is not None:
            queryset = queryset.filter(car__year=year)
        return queryset.distinct()

class IssueList(ListAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class UserCarList(ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UserCarSerializer
    filter_backends = [DjangoFilterBackend]
    
    def get_queryset(self):
        queryset = Car.objects.all()
        current_user = self.request.user
        queryset = queryset.filter(users__id=current_user.id)
        return queryset

def simple_upload(request):
    if request.method == 'POST':
        car_resource = CarResources()
        dataset = Dataset()
        new_car = request.FILES['myfile']

        imported_data = dataset.load(new_car.read())
        result = car_resource.import_data(dataset, dry_run=True)  # Test the data import

        if not result.has_errors():
            car_resource.import_data(dataset, dry_run=False)  # Actually import now

    return render(request, 'core/simple_upload.html')


# class IssueFilter(FilterSet):
#     make = NumberFilter(name='employee_owner__id')
#     model = NumberFilter(name='employee_doer__id')
#     year = NumberFilter(method='filter_both')

#     class Meta:
#         model = Task
#         fields = {
#             'owner_id',
#             'doer_id',
#             'both_id' 
#         }