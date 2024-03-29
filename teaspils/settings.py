"""
Django settings for teaspils project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
from pathlib import Path
from os.path import normpath, join

from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

LOCALE_PATHS = (
    os.path.join(BASE_DIR, "locale"),
)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-xm7n(#=j=_^)jor5do!+p)uan5vk(epsz263p$3r2w23*3^v&q'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [ 
    '0.0.0.0',
    'teaspils.upf.edu',
    '127.0.0.1'
]


# Application definition

INSTALLED_APPS = [
    'teaspils_backend.apps.TeaspilsBackendConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'imagekit'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'teaspils.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'teaspils.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'teaspils-db',
#         'USER': 'admin',
#         'PASSWORD': 'TEASPILS2021@',
#         'PORT': 3306,
#         'HOST': 'mysql',
#         }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'teaspils_aws_db',
        'USER': 'admin',
        'PASSWORD': '--Teaspils22',
        'PORT': '3306',
        'HOST': 'teaspils-aws-db.c9d6fszohvgi.eu-west-3.rds.amazonaws.com',
        }
}



# assword validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGES = (('en', _('English')),
             ('es', _('Spanish')),
             ('ca', _('Catalan')))

LANGUAGE_CODE = 'en'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/teaspils_backend/static/'   


MEDIA_ROOT_DIR = 'teaspils_backend/media'
MEDIA_ROOT = normpath(join(BASE_DIR, MEDIA_ROOT_DIR))
MEDIA_URL = 'teaspils_backend/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_ROOT = BASE_DIR / "staticfiles"


# Thumbnails
# IMAGEFIT_ROOT = '.'

# THUMBNAILS = {
#     'METADATA': {
#         'BACKEND': 'thumbnails.backends.metadata.DatabaseBackend',
#     },
#     'STORAGE': {
#         'BACKEND': 'django.core.files.storage.FileSystemStorage',
#         # You can also use Amazon S3 or any other Django storage backends
#     },
#     'SIZES': {
#         'small': {
#             'PROCESSORS': [
#                 {'PATH': 'thumbnails.processors.resize', 'width': 24, 'height': 24},
#                 {'PATH': 'thumbnails.processors.crop', 'width': 80, 'height': 80}
#             ],
#             'POST_PROCESSORS': [
#                 {
#                     'PATH': 'thumbnails.post_processors.optimize',
#                     'png_command': 'optipng -force -o7 "%(filename)s"',
#                     'jpg_command': 'jpegoptim -f --strip-all "%(filename)s"',
#                 },
#             ],
#         },
#         'large': {
#             'PROCESSORS': [
#                 {'PATH': 'thumbnails.processors.resize', 'width': 48, 'height': 48},
#                 {'PATH': 'thumbnails.processors.flip', 'direction': 'horizontal'}
#             ],
#         },
#         'watermarked': {
#             'PROCESSORS': [
#                 {'PATH': 'thumbnails.processors.resize', 'width': 20, 'height': 20},
#                 # Only supports PNG. File must be of the same size with thumbnail (20 x 20 in this case)
#                 {'PATH': 'thumbnails.processors.add_watermark', 'watermark_path': 'watermark.png'}
#             ],
#         }
#     }
# }

# # Activate Django-Heroku.
# django_heroku.settings(locals())
