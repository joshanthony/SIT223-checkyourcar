from import_export import resources
from .models import Car, Issue


class CarResources(resources.ModelResource):
    class meta:
        model = Car
        skip_unchanged = True


class IssueResources(resources.ModelResource):
    class meta:
        model = Issue
        skip_unchanged = True


# class UserResources(resources.ModelResource):
#     class meta:
#         model = User
#         skip_unchanged = True
