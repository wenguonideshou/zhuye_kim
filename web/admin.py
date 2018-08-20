from django.contrib import admin
from .models import Site, Category, SmallCategory, BackGround, BackGroundCategory

admin.site.site_header = '管理系统'
admin.site.site_title = '管理系统'

class SiteAdmin(admin.ModelAdmin):
    list_display = ['name', 'desc', 'smallcategory', 'category', 'image_url', 'true_url', 'created_time']
    search_fields = ('name',)
    date_hierarchy = 'created_time'
    ordering = ['id']

    # 显示是否国内
    def category(self, obj):
        return '%s' % obj.smallcategory.category.name

    category.short_description = '大分类'


class SiteInline(admin.TabularInline):
    model = Site
    extra = 6


class SmallCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'guonei', 'created_time']
    list_filter = ('category',)
    search_fields = ('name',)
    date_hierarchy = 'created_time'
    ordering = ['id']
    inlines = [SiteInline]

    # 显示是否国内
    def guonei(self, obj):
        return '%s' % ('国内' if obj.category.guonei else '国外')

    guonei.short_description = '国内'


class SmallCategoryInline(admin.TabularInline):
    model = SmallCategory


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'guonei', 'created_time']
    search_fields = ('name',)
    date_hierarchy = 'created_time'
    ordering = ['id']
    inlines = [SmallCategoryInline]


class BackGroundAdmin(admin.ModelAdmin):
    list_display = ['name', 'backgroundcategory', 'preview_url', 'image_url', 'created_time']
    search_fields = ('name',)
    date_hierarchy = 'created_time'
    ordering = ['id']


class BackGroundInline(admin.TabularInline):
    model = BackGround
    extra = 20


class BackGroundCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ('name',)
    ordering = ['id']
    inlines = [BackGroundInline]


admin.site.register(Site, SiteAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(SmallCategory, SmallCategoryAdmin)
admin.site.register(BackGround, BackGroundAdmin)
admin.site.register(BackGroundCategory, BackGroundCategoryAdmin)
