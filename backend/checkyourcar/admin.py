from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Car, Issue, User



class CarAdmin(ImportExportModelAdmin):
    list_display = ['id', 'make', 'model', 'year']




class UserAdmin(ImportExportModelAdmin):
    list_display = ['id', 'name', 'email']



class IssueAdmin(ImportExportModelAdmin):
    list_display = ['id', 'name', 'recall', 'notification']


admin.site.register(Car, CarAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Issue, IssueAdmin)
