from django.db import models


class Category(models.Model):
    name = models.CharField(verbose_name='标题', max_length=100)
    # 默认为国内
    guonei = models.BooleanField(verbose_name='国内', default=1)
    # auto_now_add是在新增的时候自动添加当前时间，auto_now是在修改的时候自动添加当前时间
    created_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '大分类'
        verbose_name_plural = verbose_name
        ordering = ['id']


class SmallCategory(models.Model):
    name = models.CharField(verbose_name='小分类', max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='大分类')
    created_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '小分类'
        verbose_name_plural = verbose_name
        ordering = ['id']


class Site(models.Model):
    name = models.CharField(verbose_name='站点名', max_length=20)
    desc = models.CharField(verbose_name='描述', max_length=100, blank=True)
    # verbose_name 外键在编辑文章界面展示的名字，on_delete=models.CASCADE 外键删除时被关联的表内的主键也强制删除
    smallcategory = models.ForeignKey(SmallCategory, on_delete=models.CASCADE, verbose_name='小分类')
    # ImageField类型必须设置upload_to参数
    image_url = models.ImageField('图片', upload_to='images/Site/%Y/%m/%d')
    true_url = models.URLField(verbose_name='地址', max_length=100, blank=True)
    created_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '站点'
        verbose_name_plural = verbose_name
        ordering = ['id']


class BackGroundCategory(models.Model):
    name = models.CharField(verbose_name='背景分类', max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '背景分类'
        verbose_name_plural = verbose_name
        ordering = ['id']
        

class BackGround(models.Model):
    name = models.CharField(verbose_name='背景名', max_length=20)
    backgroundcategory = models.ForeignKey(BackGroundCategory, on_delete=models.CASCADE, verbose_name='小分类')
    preview_url = models.ImageField('预览图', upload_to='images/BackGround/preview/%Y/%m/%d', default='images/BackGround/background.png')
    image_url = models.ImageField('真实图片', upload_to='images/BackGround/image/%Y/%m/%d', default='images/BackGround/background.png')
    created_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '背景'
        verbose_name_plural = verbose_name
        ordering = ['id']
