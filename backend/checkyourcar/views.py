from django.shortcuts import render
from tablib import Dataset
from checkyourcar.resources import CarResources, IssueResources, UserResources
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from checkyourcar.serializer import CarSerializer, IssueSerializer
from checkyourcar.models import Car, Issue


class CarList(ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarSearch(RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class IssueList(ListAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


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
