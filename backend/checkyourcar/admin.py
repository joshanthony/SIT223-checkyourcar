from django.contrib import admin

from .models import Car, Recall, Issue

@admin.register(Car, Recall, Issue)
class OwnerAdmin(admin.ModelAdmin):
    pass
