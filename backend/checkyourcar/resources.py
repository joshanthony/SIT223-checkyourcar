from import_export import resources
from .models import Car, Issue, User


class CarResources(resources.ModelResource):
    class meta:
        model = Car
        skip_unchanmged = True


class IssueResources(resources.ModelResource):
    class meta:
        model = Issue
        skip_unchanged = True


class UserResources(resources.ModelResource):
    class meta:
        model = User
        skip_unchanged = True
