# EON BioSystem --- Social Media Typography System

Formato base para publicaciones de redes sociales (Instagram /
Facebook).

------------------------------------------------------------------------

## 1. Canvas Base

Width: 1080px\
Height: 1350px\
Aspect ratio: 4:5

Este formato está optimizado para: - Instagram Feed - Facebook Feed -
LinkedIn

------------------------------------------------------------------------

## 2. Safe Area

Para evitar interferencia de la interfaz de Instagram:

Top: 120px\
Bottom: 120px\
Left: 90px\
Right: 90px

Área segura efectiva:

Width: 900px\
Height: 1110px

------------------------------------------------------------------------

## 3. Tipografías

### Primary Serif

Freight Neo Pro

Usos: - frases principales - titulares - slogans - mensajes

Pesos:

FreightNeoPro-Book\
FreightNeoPro-BookItalic\
FreightNeoPro-Medium

------------------------------------------------------------------------

### Brand Script

The Seasons

Uso exclusivo:

-   logotipo EON

No usar para: - frases - párrafos - slogans

------------------------------------------------------------------------

## 4. Jerarquía Tipográfica

### Level 1 --- Headline

font-family: Freight Neo Pro\
font-weight: Book\
font-size: 96px\
line-height: 92px\
letter-spacing: -0.5px\
color: #FFFFFF

Máximo 2--3 líneas.

Ejemplo:

La transformación\
ocurre en el proceso

------------------------------------------------------------------------

### Level 1 Emphasis --- Italic

font-family: Freight Neo Pro\
font-weight: BookItalic\
font-size: 96px\
line-height: 92px\
letter-spacing: -0.5px

Máximo 2 palabras en italic por frase.

Ejemplo:

La transformación\
ocurre en el proceso

------------------------------------------------------------------------

### Level 2 --- Subheadline

font-family: Freight Neo Pro\
font-weight: Medium\
font-size: 38px\
line-height: 44px\
letter-spacing: 120\
text-transform: uppercase

Ejemplo:

TIEMPO BIEN VIVIDO

------------------------------------------------------------------------

### Level 3 --- Brand Descriptor

Ejemplo:

BioSystem

font-family: Freight Neo Pro\
font-weight: Book\
font-size: 44px\
line-height: 44px\
letter-spacing: 0

------------------------------------------------------------------------

## 5. Logotipo

Composición:

The Seasons → "EON"\
Freight Neo Pro → BioSystem\
Freight Neo Pro Medium → TIEMPO BIEN VIVIDO

Escala recomendada:

EON (The Seasons): 120px\
BioSystem: 48px\
TIEMPO BIEN VIVIDO: 32px

Separaciones:

EON → BioSystem: 16px\
BioSystem → slogan: 8px

Posición:

x: 90px\
y: 120px

------------------------------------------------------------------------

## 6. Símbolo (∞)

Tamaño: 56px

Posición:

x: 990px\
y: 120px

Color:

#FFFFFF\
Opacity: 90--100%

------------------------------------------------------------------------

## 7. Posiciones de Texto

### Layout A --- Bottom Left Editorial

x: 90px\
y: 980px\
max-width: 700px

------------------------------------------------------------------------

### Layout B --- Center Statement

x: 540px\
y: 700px\
text-align: center\
max-width: 800px

------------------------------------------------------------------------

### Layout C --- Top Left Brand

x: 90px\
y: 120px

------------------------------------------------------------------------

## 8. Reglas de Composición

Cada post debe incluir:

1 frase principal\
1 palabra en italic (opcional)\
1 elemento de marca (logo o símbolo)

Evitar:

más de 3 líneas\
más de 2 estilos tipográficos\
sombras o contornos

------------------------------------------------------------------------

## 9. Colores de Texto

Texto principal:

#FFFFFF

Texto secundario:

#F2F2F2

Opacidad mínima:

85%

------------------------------------------------------------------------

## 10. Canvas Drawing Reference

Ejemplo Canvas API:

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "96px 'Freight Neo Pro'";
    ctx.fillText("La transformación", 90, 980);

    ctx.font = "italic 96px 'Freight Neo Pro'";
    ctx.fillText("ocurre en el proceso", 90, 1070);

------------------------------------------------------------------------

## 11. Logo Drawing Example

    ctx.font = "120px 'The Seasons'";
    ctx.fillText("EON", 90, 120);

    ctx.font = "48px 'Freight Neo Pro'";
    ctx.fillText("BioSystem", 90, 260);

    ctx.font = "32px 'Freight Neo Pro'";
    ctx.fillText("TIEMPO BIEN VIVIDO", 90, 320);

------------------------------------------------------------------------

## 12. Feed Editorial System

70% posts con símbolo\
20% posts sin marca visible\
10% posts con logotipo completo

------------------------------------------------------------------------

## 13. Estructura de Frases

Formato recomendado:

Concepto\
acción en italic

Ejemplos:

La transformación\
ocurre en el proceso

Tu cuidado hoy\
se reflejará mañana

El tiempo\
bien vivido

------------------------------------------------------------------------

## 14. Principio de Diseño

El sistema debe comunicar:

-   proceso
-   tiempo
-   bienestar real
-   estética editorial

Reglas clave:

tipografía protagonista\
fotografía respirable\
marca discreta
