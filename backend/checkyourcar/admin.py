from django.contrib import admin

from .models import Car, Issue

@admin.register(Car, Issue)
class OwnerAdmin(admin.ModelAdmin):
    pass
