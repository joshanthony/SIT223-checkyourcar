from csv import DictReader
from django.core.management import BaseCommand
from checkyourcar.models import Car

class Command(BaseCommand):
    #User Help - show them this
    help = "Loads Car data from your csv file to the database"

    def handle(self, *args, **options):
        print()





