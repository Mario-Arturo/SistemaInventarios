from django.db import models

# Create your models here.

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField()
    proveedor = models.CharField(max_length=100)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    nivel_minimo = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre