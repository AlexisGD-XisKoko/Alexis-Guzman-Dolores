from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# Generar la llave privada 
llave_privada = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)
llave_publica = llave_privada.public_key()

# Procesar y limpiar la Llave Pública
texto_llave_publica = llave_publica.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
).decode('utf-8')

texto_limpio_publica = texto_llave_publica.replace("-----BEGIN PUBLIC KEY-----\n", "").replace("-----END PUBLIC KEY-----\n", "")

with open("llave_publica.txt", "w") as f:
    f.write(texto_limpio_publica)

# Procesar y limpiar la Llave Privada
texto_llave_privada = llave_privada.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.TraditionalOpenSSL,
    encryption_algorithm=serialization.NoEncryption()
).decode('utf-8')

texto_limpio_privada = texto_llave_privada.replace("-----BEGIN RSA PRIVATE KEY-----\n", "").replace("-----END RSA PRIVATE KEY-----\n", "")

with open("llave_privada.txt", "w") as f:
    f.write(texto_limpio_privada)

print("Ambas llaves han sido guardadas como archivos .txt y sin etiquetas de inicio/fin.")