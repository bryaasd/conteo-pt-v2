// ── Conteo PT — Service Worker v4.80.0 ─────────────────────────────────────
// Cambios v4.80.0 (rediseño grande de Tabla PT + migración de Firebase):
//   · QUITADOS — Selectores en cascada (Calidad→Material→Tipo→Medida→
//     Espesor) en Conteo, Entrada (MO), Salidas (SRO), BNC, el modal
//     "Agregar producto a MO/SRO" y el modo tradicional de Despachos —
//     ahora solo queda el buscador en vivo (código o descripción) en
//     todos ellos, igual al que ya usaba la Ficha Digital del Mapa. En
//     MO/SRO/BNC/regAgr y Conteo, Calidad queda preseleccionada en 1RA
//     por defecto.
//   · REDISEÑO — Tabla PT ya no es una colección propia por área con
//     Tipo/Material/Medida/Pies/Espesor capturados a mano: ahora se
//     alimenta directo de la Base Odoo (referencia), que pasa a ser la
//     única fuente de productos de todo el sistema. Se mantienen como
//     campos reales Color, Peso (Kg/U, 3 decimales) y Unidades/Atado;
//     Tipo/Material/Medida/Pies/Espesor/Calidad se derivan automáticamente
//     de la descripción y el código, solo para uso interno (Resumen,
//     reportes) — ya no se capturan ni se muestran como columnas. Se
//     eliminó el Código Corto por completo.
//   · NUEVO — Cada código de la Base Odoo se clasifica automáticamente por
//     Área (Tubería/Costanera/Lámina/Tiras-Bobinas/Insumos) según palabra
//     clave en la descripción, editable directo en la tabla si la
//     detección se equivoca. "Insumos" es una etiqueta para lo que no es
//     material de PT (pintura, guantes, herramientas, etc.) — no tiene
//     pestañas propias ni aparece en el login.
//   · NUEVO — Botón "📥 Importar catálogo (Excel)" en Tabla PT: carga
//     código+descripción+peso desde un Excel tipo Quants de Odoo, solo
//     agrega códigos nuevos, nunca pisa los existentes.
//   · NUEVO — Botón "🗑 Eliminar todo" en Tabla PT (protegido con PIN):
//     borra todos los códigos de la Base Odoo, de todas las áreas a la
//     vez. Color y Peso/U-Atado ahora se editan con un botón que abre un
//     modal dedicado, en vez de campos libres directo en la tabla.
//   · MEJORADO — Varios ajustes de legibilidad en la tabla de Tabla PT:
//     columnas mejor distribuidas (Código/Descripción/Área ya no se
//     encimaban en pantallas angostas), U/Atado y Kg/U centrados, Color
//     pasó de select desplegable a modal con grilla de opciones.
//   · CORREGIDO — Varios casos reales del parser que deriva Tipo/Material
//     desde la descripción de Odoo: no reconocía "Galv." abreviado, no
//     tenía rama para "Bobina" (solo "Tira"), solo aceptaba género
//     femenino "Roja/Blanca" cuando las descripciones usan mayormente
//     masculino "Rojo/Blanco", no reconocía "Liso Cerca" ni "Mecánico"
//     (solo "Proceso"), y la familia Lisa nunca extraía la Medida. Tubo
//     sin material especificado y Lisa Fría ahora asumen Negro/Galvanizado
//     por defecto respectivamente, según patrón real del catálogo.
//   · MIGRACIÓN — El proyecto de Firebase cambió de `conteo-pt` a
//     `condor-pt-v2` (Firestore + Storage nuevos, ambos en modo
//     producción) por motivos de seguridad — las copias de la app ya
//     instaladas fuera del equipo actual quedan con acceso cortado al
//     apuntar al proyecto viejo, sin datos nuevos visibles de ahí en más.
//     Las 3 Cloud Functions de IA (escaneo de despacho/torres/tiras) se
//     dejaron por ahora en el proyecto viejo, sin migrar.
//

// ── Conteo PT — Service Worker v4.78.0 ─────────────────────────────────────
// Cambios v4.78.0 (Alertas 🚨 — nuevo):
//   · NUEVO — Botón 🚨 en el header: disponible para todos los perfiles y
//     áreas, en escritorio, tablet y móvil. Protegido con código de acceso
//     (1234) antes de abrir el formulario.
//   · NUEVO — Modal "Reportar Alerta": nombre de quien reporta, área
//     (fija según el área activa), fecha y hora (fijas al momento de
//     abrir), comentario y hasta 10 fotos (cámara o galería), con overlay
//     de éxito visible al guardar.
//   · NUEVO — Pestaña "🚨 Alertas" dentro del perfil Auditoría (Registro de
//     Operaciones): agrega en tiempo real las alertas de las 4 áreas
//     (Tubería, Costanera, Lámina, Bodega de Segunda) y también las
//     reportadas estando dentro del propio perfil Auditoría. Incluye
//     chips de filtro por área, filtro por rango de fechas (Desde/Hasta) y
//     tarjetas de tamaño uniforme con miniaturas de fotos.
//   · NUEVO — Editar y eliminar cada alerta desde Auditoría: editar permite
//     cambiar nombre, comentario y fotos (agregar/quitar, respetando el
//     máximo de 10); eliminar pide el PIN de borrado y limpia también las
//     fotos asociadas en Firebase Storage.
//   · NUEVO — Botón "📄 Generar PDF": reporte imprimible/descargable como
//     PDF con todas las alertas según los filtros de área y fecha activos.
//   · NUEVO — Botón "🖱️ Reporte Interactivo": descarga un archivo .html
//     autocontenido (para enviar por correo/WhatsApp) con buscador, chips
//     de filtro por área y fotos que se amplían al tocarlas.
//   · MEJORADO — Botón "✕" para quitar fotos: mismo estilo (círculo rojo)
//     unificado entre el modal de Alertas y el modal de Papelería/Carga en
//     Operaciones (Despachos/Entrada); en Papelería/Carga el botón ya no
//     queda recortado por el borde de la miniatura.
//   · NUEVO — Visor de imagen ampliada reutilizable: tocar cualquier foto
//     (Alertas o Papelería/Carga) la abre a pantalla casi completa con
//     fondo oscuro.
//

// ── Conteo PT — Service Worker v4.77.1 ─────────────────────────────────────
// Cambios v4.77.1 (Resumen — modal del marcianito, Entradas/Salidas):
//   · CORREGIDO — Botón ⏳ (activar/desactivar registro) dentro del modal de
//     Entradas/Salidas abierto desde el marcianito (Resumen): el cambio se
//     guardaba en la base pero no se veía reflejado en la tarjeta hasta
//     cerrar el modal y volver a abrirlo. Ahora se actualiza de inmediato,
//     igual que ya pasaba estando parado en las pestañas Entrada/Salidas.
//

// ── Conteo PT — Service Worker v4.77.0 ─────────────────────────────────────
// Cambios v4.77.0 (Resumen — modal 👻 Conteo):
//   · NUEVO — Modal 👻 (Conteo General/Parcial, ver v4.76.0): botón
//     "➕ Registrar Conteo" que abre un formulario simple (Atados/Sueltas)
//     para agregar un registro nuevo del código sin salir del modal. Guarda
//     en Conteo Parcial o Conteo General según la pestaña que tengas activa
//     en ese momento — cubre ambos casos.
//

// ── Conteo PT — Service Worker v4.76.1 ─────────────────────────────────────
// Cambios v4.76.1 (Resumen — modales nuevos, corrección visual):
//   · CORREGIDO — Modales nuevos (Entradas/Salidas/Stock Odoo/Conteo, ver
//     v4.76.0): varios modales que se abren desde botones de esas tarjetas
//     (Ficha del código con doble clic, Editar Entrada/Salida individual y
//     en grupo, Vincular con Sistema, Validar contra Odoo, Comentario,
//     Agregar producto a una Entrada/Salida, Editar Registro de Conteo)
//     aparecían ocultos detrás del modal nuevo en vez de encima. Ya se ven
//     correctamente por delante.
//

// ── Conteo PT — Service Worker v4.76.0 ─────────────────────────────────────
// Cambios v4.76.0 (Resumen — modal del marcianito y nuevo botón fantasma):
//   · NUEVO — Modal de Movimientos Odoo ("marcianito" 👽): los botones
//     "📥 Entradas" y "📤 Salidas" ya no sacan de ese modal ni cambian de
//     pestaña — ahora abren un modal encima, filtrado por el código exacto,
//     con el mismo diseño de tarjetas (expandir/contraer todo incluido) que
//     ya conocías en esas pestañas.
//   · NUEVO — Modal de Movimientos Odoo: el botón "📦 Stock Odoo" también
//     abre ahora un modal encima (en vez de cambiar de pestaña), filtrado
//     por el código exacto, con edición de la existencia (✏ Editar) y un
//     formulario para cargar el código si todavía no existe en Odoo — sin
//     salir del modal. "Conteo Físico" ahí ahora se calcula igual que en
//     Resumen (Conteo General + Entradas − Salidas), no solo Conteo General.
//   · NUEVO — Vista Físico vs Papelería del Resumen: columna nueva con
//     ícono 👻 en cada fila. Abre un modal con los registros de Conteo de
//     ese código exacto — arranca en Conteo Parcial; para ver Conteo
//     General pide contraseña. Permite editar, eliminar y borrar en lote
//     (seleccionando filas) igual que en la pestaña Conteo, sin salir del
//     modal.
//   · CORREGIDO — Los cambios hechos desde estos modales nuevos (Entradas/
//     Salidas/Stock Odoo/Conteo) ahora se reflejan de inmediato en Resumen y
//     en la barra "Saldo Movimientos vs Odoo Base" del propio modal del
//     marcianito, sin tener que cambiar de pestaña y volver.
//   · CORREGIDO — Conteo Parcial: los cambios en tiempo real (edición,
//     borrado) ahora también refrescan la pestaña Resumen cuando está
//     activa, igual que ya hacía Conteo General.
//


// Cambios v4.75.0 (Stock Odoo, Conteo, Mapa/Ficha Digital, Resumen):
//   · CORREGIDO — Buscador de Stock Odoo (Tiras de Bobinas): ya no filtra por
//     peso/cantidad ni por comentario (generaban falsos positivos, ej.
//     buscar "488" también encontraba pesos como "1,295.488"). Ahora se
//     puede filtrar exacto por N° de Lote escribiendo "L" seguido del
//     número (ej. "L3").
//   · CORREGIDO — Buscador de código/descripción en Conteo (General y
//     Parcial, todas las áreas): al elegir un resultado de la lista, podía
//     terminar aplicando otro código parecido en vez del elegido (ej. dos
//     Costaneras iguales pero de distinto largo en metros). Ahora siempre
//     queda seleccionado exactamente el código elegido.
//   · CORREGIDO — Reporte PDF de Resumen (Físico vs Papelería / Físico vs
//     Sistema): el diálogo de impresión se abría antes de que las gráficas
//     terminaran su animación, dejándolas incompletas en el PDF. Se amplió
//     el tiempo de espera antes de imprimir.
//   · CORREGIDO — Mapa / Ficha Digital: al abrir una ficha con datos y
//     guardarla sin hacer ningún cambio, podían perderse conteos reales de
//     Conteo Parcial que la ficha no conocía (por desincronización entre el
//     Mapa y Conteo Parcial). Ahora la ficha siempre se carga y se guarda
//     contra los registros reales de Conteo Parcial (fuente de la verdad),
//     nunca contra una copia-resumen que podía quedar desactualizada.
//   · NUEVO — Conteo (General/Parcial): al eliminar registros seleccionados
//     en lote, ahora se muestra un overlay de carga mientras se procesa el
//     borrado.
//   · MEJORADO — Modal "Editar Registro" de Conteo: ahora muestra la
//     descripción real del código tal como aparece en Tabla PT, con mejor
//     jerarquía visual (antes mostraba "null" cuando la medida estaba vacía
//     y no incluía la descripción).
//


// ── Conteo PT — Service Worker v4.74.0 ─────────────────────────────────────
// Cambios v4.74.0 (Conteo, Entrada, Salidas, Resumen y Stock Odoo):
//   · NUEVO — Registros de Conteo (General/Parcial): botón "☑ Seleccionar"
//     activa un modo temporal con checkbox por fila (clic en cualquier parte
//     de la fila selecciona, no solo el checkbox), "Seleccionar todo" (solo
//     sobre lo filtrado) y "🗑 Eliminar seleccionados" — borra en lote con un
//     solo PIN, sincronizando el Mapa igual que el borrado individual. No
//     afecta el flujo de editar/eliminar uno por uno, que sigue igual.
//   · NUEVO — Reporte Excel de Resumen: columna "CÓDIGO + DESCRIPCIÓN" en la
//     hoja "Detalle" (posición B), con el texto exacto de la Base Odoo
//     (referencia); en blanco si el código no está ahí. No se tocó ninguna
//     otra columna ni hoja del reporte.
//   · NUEVO — Conteo (General/Parcial): el "Código rápido" (búsqueda exacta)
//     se reemplazó por un buscador en vivo por código o descripción contra
//     la Tabla PT del área activa, con lista de resultados para elegir.
//   · CORREGIDO — Al guardar por el flujo de Conteo Parcial ("Agregar a la
//     lista" → "Guardar Conteo"), el campo Pies no se estaba guardando
//     (sí se guardaba con el registro directo de Conteo General). Afectaba
//     a todas las áreas con productos de familia Lámina.
//   · NUEVO — Ficha del código: doble clic en cualquier parte de una fila
//     de Conteo, Entrada, Salidas o Resumen (excepto en la columna Código y
//     en los botones de Acciones) abre un modal con la ficha del producto
//     (código, descripción, equivalencia de atado y color), leída de la
//     Tabla PT.
//   · MEJORADO — Buscador de Stock Odoo (Tiras de Bobinas): ahora es por
//     palabras (no importa el orden) y también busca en N° Lote, Cantidad y
//     el comentario de la tira — antes solo encontraba coincidencias exactas
//     y pegadas en código/descripción/lote.
//


// Cambios v4.73.0 (Seguridad — PINs):
//   · CAMBIADO — PIN de Verificador de Inventario — Costanera (Planta BSM):
//     ahora es 'contraseña2024' (antes 'costanera2024').
//

// ── Conteo PT — Service Worker v4.72.0 ─────────────────────────────────────
// Cambios v4.72.0 (Teclado en campos de texto):
//   · CORREGIDO — Muchos campos de texto (buscadores, comentarios, nombres,
//     destinos, etc.) autocapitalizaban la primera letra por defecto, lo que
//     hacía que el teclado del celular ocultara la fila de números y mostrara
//     las letras en mayúscula. Ahora esos campos usan autocapitalize="off",
//     igual que el campo de Contraseña, para que el teclado se vea siempre
//     con números visibles y en minúscula en toda la app. Los campos de
//     Lote/N° de serie (que sí necesitan mayúsculas automáticas para el
//     código de lote) se dejaron sin cambios.
//

// ── Conteo PT — Service Worker v4.71.0 ─────────────────────────────────────
// Cambios v4.71.0 (Base Odoo por Área + Pantalla de Login):
//   · NUEVO — Base Odoo (referencia): cada código ahora se clasifica
//     automáticamente por ÁREA según palabra clave en su descripción — "TIRA"
//     o "BOBINA" → Tira/Bobina, "LAMINA" → Lámina, "COSTANERA" → Costanera,
//     "TUBO" → Tubería (TIRA/BOBINA se revisan antes que LAMINA, para que
//     "TIRA LAMINA" quede como Tira/Bobina y no como Lámina).
//   · NUEVO — Modal "Ver Base Odoo (referencia)": cada código muestra un chip
//     de color con su área (o "Sin clasificar" si no coincide ninguna palabra
//     clave), y un selector para reclasificarlo manualmente (Auto/Lámina/
//     Costanera/Tubería/Tira-Bobina). La clasificación manual queda guardada
//     en Firestore y tiene prioridad sobre la detección automática.
//   · NUEVO — Buscador de "➕ Agregar Productos" en Operaciones y buscador del
//     modal "Elegir código" del Mapa: ahora solo muestran códigos de la
//     misma Área en la que se está trabajando (antes mezclaban resultados de
//     Lámina/Costanera/Tubería/Tira-Bobina sin distinción). Bodega de Segunda
//     sigue mostrando todas las áreas, ya que agrupa la calidad 2DA de todos
//     los tipos. Los códigos sin área detectable quedan ocultos de estos dos
//     buscadores (siguen visibles y clasificables en el visor de Base Odoo).
//   · Pantalla de Login: las 6 tarjetas de Área (Tubería/Costanera/Lámina/
//     Tiras de Bobinas/Bodega de Segunda/Auditoría) ahora tienen el mismo
//     tamaño exacto entre sí — antes las de texto en 2 líneas quedaban más
//     grandes que las de 1 línea. El panel que envuelve todas las tarjetas
//     del login se hizo más traslúcido (antes casi opaco), para que se note
//     más la foto de fondo del carrusel detrás.
//

// ── Conteo PT — Service Worker v4.70.0 ─────────────────────────────────────
// Cambios v4.70.0 (Mapa, Lámina — Ficha Digital):
//   · CORREGIDO — Al guardar una Ficha Digital desde el Mapa (o desde la
//     captura por foto/IA de Torres), los registros que se crean en Conteo
//     Parcial no llevaban fecha/hora, y esa columna salía "undefined". Ahora
//     se guarda la fecha/hora real igual que en el resto de los flujos.
//   · NUEVO — Modal "Elegir código": los "Filtros rápidos" (Lámina/Capote,
//     Calidad, Material, Tipo, Medida, Pies, Espesor) quedan ocultos detrás
//     de un botón "🔒 Mostrar filtros" que pide PIN 2907 (mismo modal de PIN
//     que ya usa el resto de la app). Mientras están bloqueados no queda
//     ningún filtro aplicado (ni siquiera Lámina/Capote seleccionado); al
//     desbloquear se restaura el comportamiento de siempre (arranca en
//     Lámina y recuerda Calidad/Material/Tipo de la última vez).
//   · NUEVO — Chip de Calidad (⭐ 1RA / 🥈 2DA) arriba del buscador libre
//     "Buscar por código o descripción", independiente de los Filtros
//     rápidos bajo candado: siempre hay una calidad activa (nunca ninguna ni
//     las dos a la vez), arranca en 1RA, y filtra los resultados del
//     buscador para mostrar solo esa calidad.
//   · CORREGIDO — Buscador libre: escribir un pie/medida entero (ej. "6")
//     mostraba también resultados de números que simplemente lo contenían
//     (ej. "16 pies"). Ahora los números enteros (Pies/Medida) se comparan
//     por su valor exacto — "6" ya no matchea "16", pero sí reconoce "06"
//     como el mismo valor que "6". El Espesor (decimales, ej. "0", "0.",
//     "0.35") se dejó igual que antes: coincidencia parcial, para que se
//     vaya filtrando en vivo mientras se escribe.
//   · Buscador libre / Código rápido: cuando la búsqueda deja 2 o más
//     resultados, ahora se pintan TODAS las filas de rojo (antes solo se
//     pintaba en casos muy puntuales) como alerta clara de que la búsqueda
//     todavía es ambigua y conviene precisarla más antes de elegir. Con 1
//     solo resultado se sigue pintando por calidad (verde 1RA, naranja 2DA).
//   · NUEVO — Ficha Digital: columna "N°" en la tabla de códigos agregados,
//     que enumera cada fila (1, 2, 3...).
//

// ── Conteo PT — Service Worker v4.69.0 ─────────────────────────────────────
// Cambios v4.69.0 (Operaciones — Entrada/Salida):
//   · NUEVO — Buscador inteligente de producto en "➕ Agregar Productos":
//     permite escribir texto libre (ej. "galva 0.20 9 pies ondula") en vez de
//     navegar los selects en cascada Material→Tipo→Medida→Pies→Espesor.
//     Busca sobre la Base Odoo (referencia, más completa que la Tabla PT
//     vieja); si el código existe en Odoo pero todavía no está en la Tabla
//     PT, muestra un aviso y ofrece crearlo ahí mismo (pide PIN 4521 antes de
//     abrir el alta, y precarga código/descripción/calidad). Al crearlo,
//     queda automáticamente seleccionado en el formulario. Los resultados de
//     la búsqueda se pintan de verde (1RA CALIDAD) o naranja (2DA CALIDAD)
//     según el prefijo del código, para distinguirlos de un vistazo.
//   · NUEVO — Botón "🔀 Forma tradicional" junto a "Agregar Productos": permite
//     alternar en cualquier momento entre el buscador nuevo y los selects en
//     cascada de siempre (por si se prefiere esa forma de captura). Ambos
//     modos comparten la Calidad elegida y la tarjeta del producto.
//   · Calidad (1RA/2DA) — además de mostrar la calidad del producto elegido,
//     ahora también filtra el buscador (1RA seleccionada por defecto); al
//     cambiarla se refiltran al instante los resultados mostrados, tanto en
//     el buscador como en las opciones disponibles de la forma tradicional.
//   · Rediseño visual en Operaciones: tarjeta de producto elegido con acento
//     naranja y resplandor sutil; botones "✨ Escanear hoja con IA" (morado,
//     con brillo animado) y "➕ Agregar a la lista" (naranja, acción
//     principal) ahora claramente diferenciados entre sí; y la lista
//     "Productos en este despacho" con franja de color por calidad en cada
//     fila, contador de productos, totales más grandes con resplandor verde,
//     y botones de acción (editar/eliminar) circulares.
//

// ── Conteo PT — Service Worker v4.68.0 ─────────────────────────────────────
// Cambios v4.68.0 (Auditoría):
//   · NUEVO — Reporte interactivo de Auditoría (Entradas/Salidas): rediseño
//     completo de tabla plana a tarjetas, con el mismo estilo visual que la
//     vista en vivo de Auditoría (badges de área/tipo, número, fecha,
//     comentario, enlaces 1RA/2DA, totales por calidad, estado y botón de
//     PDF). Cada tarjeta se expande al tocarla y muestra el detalle de
//     líneas (código, calidad, tipo, material, medida, espesor, atados,
//     sueltas, total y peso en Kg). Se conservan el buscador y los chips de
//     filtro por área, y se agregó un botón "Expandir todo/Contraer todo".
//   · NUEVO — Reporte interactivo de Auditoría: logo de la empresa incrustado
//     en el encabezado (base64, para que se vea siempre sin depender de una
//     ruta externa) y fondo cambiado a blanco (antes oscuro), con los colores
//     de acento reajustados para mantener buen contraste sobre fondo claro.
//   · NUEVO — Reporte de Auditoría exportable también a Excel (.xlsx), con
//     los mismos filtros aplicados (área, búsqueda, fechas) que el reporte
//     interactivo. Genera dos hojas: "Resumen" (una fila por boleta/SRO) y
//     "Detalle" (una fila por línea de producto, incluyendo el peso).
//   · Buscador de Auditoría (vista en vivo y reporte interactivo) simplificado
//     a solo "🔍 Buscar" — antes mostraba una lista larga de ejemplos que se
//     veía cortada en pantallas angostas.
//   · Perfil "Registro de Operaciones" (Auditoría): ocultas las pestañas
//     Resumen y Operaciones, tanto en el header de escritorio como en el nav
//     inferior móvil — solo quedan visibles Entrada y Salidas, que es lo que
//     de verdad usa este perfil.
//   · CORREGIDO — Bug de una pestaña "Dashboard" ya eliminada del HTML pero
//     cuya referencia seguía en el listener de cambios de la Tabla PT
//     (colección "registros"). Esa referencia rota (`getElementById` sobre un
//     elemento inexistente) interrumpía silenciosamente la ejecución y hacía
//     que Resumen y el modal de Análisis no se refrescaran solos al registrar
//     un conteo mientras ya estaban abiertos en pantalla (había que salir y
//     volver a entrar para verlos actualizados). Quitada la línea huérfana;
//     no afecta ninguna otra función.
//

// Cambios v4.67.0:
//   · CORREGIDO — Tabla PT (Nuevo/Editar Producto): el botón "💾 Guardar" no
//     quedaba bloqueado mientras se guardaba en Firebase. Un doble toque
//     rápido (señal lenta o impaciencia) podía disparar dos guardados en
//     paralelo antes de que el primero terminara, y como la validación de
//     código duplicado compara contra la copia local de la Tabla PT (que
//     todavía no se había actualizado), ambos pasaban y se creaban dos
//     productos idénticos. Corregido agregando el mismo overlay de bloqueo
//     ("Guardando...") que ya usan el resto de las funciones de guardado del
//     sistema (Registrar Movimiento, MO, SRO, Despacho, Conteo Parcial).
//   · CORREGIDO — Conteo (todas las áreas excepto Tiras de Bobinas): si el
//     campo "Sueltas" tenía un valor inválido (texto no numérico), se
//     guardaba en silencio como 0 en vez de avisar y detener el guardado —
//     a diferencia de "Atados", que sí bloqueaba con un aviso claro. Ahora
//     "Sueltas" se valida igual que "Atados": muestra "⚠️ Valor inválido en
//     Sueltas" y no guarda el registro si el texto no es válido. Dejar el
//     campo vacío sigue funcionando igual que antes (se toma como 0).
//   · NUEVO (Mapa, Lámina) — Ficha Digital, modal "Elegir código": los chips
//     de Pies que son múltiplos de 10 (10, 20, 30, 40...) ahora se pintan de
//     naranja como marcador visual, para ubicar de un vistazo en qué tramo
//     de 10 se está dentro de una lista larga de valores. Al seleccionar uno
//     de esos chips, pasa a mostrar el resaltado verde normal de "activo"
//     como cualquier otro chip elegido.
//

// Cambios v4.66.5 (Mapa, Lámina):
//   · Se quitó el bloqueo de acceso a celdas en edición por otra persona. El
//     color rojo con pulso se mantiene igual, en tiempo real para todos, como
//     indicador de que alguien más está editando esa Área+Línea — pero ya no
//     impide entrar: cualquiera puede tocar la celda roja y abrirla
//     normalmente. El resto del sistema de presencia (toma del bloqueo,
//     señal de actividad periódica, expiración automática si el navegador se
//     cierra de golpe) sigue funcionando igual, ya que es lo que alimenta el
//     color rojo.
//
// ── Conteo PT — Service Worker v4.66.4 ─────────────────────────────────────
// Cambios v4.63.1 – v4.66.4 (Tiras de Bobinas, Mapa/Ficha Digital de Lámina):
//
//   · Tiras de Bobinas — Registros: nuevo botón ✏ en cada fila del listado de
//     Registros (Conteo General/Parcial) que abre un modal exclusivo para
//     editar Código, Descripción, Lote y Peso (reemplazo directo, sin validar
//     duplicados código+lote). No afecta el modal de edición de las otras 4
//     áreas (Costanera, Lámina, Bodega de Segunda).
//   · Tiras de Bobinas — Stock Odoo: se agregó el mismo botón ✏ en cada
//     tarjeta (código/desc/lote/cantidad), con su propio modal; al guardar,
//     el Lote se vuelve a descomponer en sus 5 partes para mantener
//     sincronizado el filtro en cascada Espesor→Lote→Correlativo→Medida/
//     N°Tira. El filtro de Espesor de ese panel pasó de `<select>` nativo a
//     botón cíclico (mismo patrón que Lote/Correlativo/Medida), y los 4
//     niveles ganaron capacidad de retroceder (◀) además de avanzar (▶).
//
//   · Ficha Digital (Mapa, Lámina):
//       - Protegida contra pérdida accidental: salir del modal por clic
//         afuera, Esc o el botón Cancelar ya NO borra las filas agregadas.
//         El borrador se conserva en memoria y se restaura tal cual al
//         reabrir la misma Área+Línea; solo se limpia al guardar con éxito.
//       - Al intentar abrir una Área+Línea distinta habiendo un borrador
//         pendiente de otra posición, se pregunta antes de descartarlo
//         (mostrando cuál posición y cuántos códigos tiene sin guardar).
//       - Elegir un código que ya está en la lista ahora agrega una fila
//         nueva e independiente en vez de bloquear el duplicado (decisión
//         explícita: no se unifican registros repetidos del mismo código).
//       - Nuevo botón 🧮 junto al campo Cantidad de cada fila: abre un modal
//         dedicado para sumar/restar con botones ➕➖ táctiles (ej. "5+3+2"),
//         con el resultado visible en vivo mientras se escribe, y lo aplica
//         como valor final de esa fila al confirmar.
//       - Nuevo botón 🎤 de búsqueda por voz junto al buscador "por código o
//         descripción" (opción adicional — el campo de texto se conserva
//         igual). Usa la Web Speech API nativa del navegador (Chrome
//         Android/escritorio; no disponible en iPhone/Safari ni Firefox, ni
//         de forma confiable dentro de la ventana de la app instalada en
//         escritorio — funciona bien en una pestaña normal de Chrome). La
//         transcripción se corrige automáticamente contra el vocabulario
//         real de Tipo/Material de Lámina (por distancia de edición, ej.
//         "Alucin ondular" → "ALUZINC ONDULADA") y descarta la palabra
//         "punto" en números decimales. Si falla, el aviso indica el motivo
//         específico (sin permiso de micrófono, sin conexión, no detectó
//         voz, sin micrófono disponible). El campo de búsqueda hace foco
//         automático (con foco inmediato + respaldo) al abrir el modal.
//
//   · Mapa (Lámina) — soporte para varias personas trabajando a la vez:
//       - Ocupación general del Mapa actualizada en vivo para todos, sin
//         depender de refrescar manualmente.
//       - Indicador por Área+Línea: si alguien tiene una posición abierta
//         con borrador pendiente, se pinta en rojo con pulso para todos en
//         tiempo real (ver también v4.66.5 — dejó de bloquear el acceso).
//         La toma de la posición NO se libera al cerrar el modal por
//         accidente (mismo criterio que el borrador) — solo al guardar con
//         éxito o al descartar el borrador para abrir otra posición. Expira
//         sola tras ~90s sin señal de actividad si el navegador se cierra de
//         golpe, para que ningún cuadro quede trabado en rojo para siempre.
//         No identifica a la persona por nombre.
//       - La celda de la que se sale con un borrador propio sin guardar se
//         pinta de amarillo (distinto del rojo de otra persona editando),
//         como recordatorio de que hay operaciones pendientes ahí.
//
//   · Auditoría de esta entrega: validación de sintaxis (parser Acorn + `new
//     Function()`) en los 10 bloques `<script>` tras cada cambio, diffs
//     dirigidos para confirmar que cada edición tocó únicamente lo esperado,
//     verificación cruzada de que toda función/ID nuevo referenciado en el
//     HTML existe realmente, y batería de pruebas unitarias sobre la lógica
//     más delicada (corrección de voz, parseo de lote, evaluación de sumas
//     decimales, ciclo adelante/atrás de los filtros, presencia del Mapa
//     propia/ajena/expirada) — todas pasaron.
//
// ── Conteo PT — Service Worker v4.63.0 ─────────────────────────────────────
// Cambios v4.63.0:
//   · CORREGIDO — Pantalla de login: la tarjeta de perfil seleccionada (Verificador
//     Inventario/Operaciones/Transporte) perdía el marco/resplandor de forma
//     permanente al volver a hacer clic en ella o al cambiar a otra tarjeta,
//     dejando la pantalla sin ninguna selección visible. Causa: la función
//     `seleccionarPerfil()` usaba `el.style.cssText += ...` para pintar el borde,
//     un patrón inestable que reconstruye todo el atributo `style` desde cero en
//     cada clic. Corregido con asignación directa (`el.style.borderColor`/
//     `background`), mismo criterio que ya usaban los selectores de Área y
//     Planta (que nunca tuvieron este bug).
//
//   · Tiras de Bobinas — Stock Odoo: panel de filtros rediseñado por completo.
//       - Se reemplazaron los chips planos (Material/Tipo/Medida/Espesor/N°Lote/
//         Peso) por un filtro en cascada de 4 niveles — Espesor → Lote →
//         Correlativo → Medida/N°Tira — parseado directamente del string de lote
//         de Odoo (ej. "C1.50-2537-142-288.0mm-4"), que es la estructura real con
//         la que se identifica una tira física.
//       - Espesor es un `<select>` desplegable nativo, con las opciones agrupadas
//         por letra (Galvanizado/Negro) y coloreadas para diferenciarlas de un
//         vistazo. Lote, Correlativo y Medida/N°Tira son botones cíclicos (mismo
//         componente `cycleSelect` que ya usa el resto del sistema), que se
//         pintan de naranja al tener un valor elegido.
//       - Nuevo buscador de texto libre (código, descripción o lote), que ignora
//         tildes y mayúsculas/minúsculas, combinable con el filtro en cascada.
//       - Nuevo botón de eliminar por tira individual, protegido con PIN 4521.
//       - Nueva burbuja de notificación naranja en el botón 👽 de cada tira,
//         mostrando cuántos movimientos Odoo de ese código están en estado
//         Pendiente/Mala digitación/??? — visible tanto en la tabla del Stock
//         Odoo como, más abajo, replicada en el marcianito del Resumen general.
//       - Reporte PDF de Stock Odoo simplificado a 7 columnas (Código,
//         Descripción, Lote, Cantidad, N° Tira, Estado, Comentario) y corregido
//         para usar el ancho completo de la hoja (le faltaba una regla @page
//         explícita, por lo que el navegador aplicaba sus propios márgenes por
//         defecto) — además de letra más grande y filas que ya no se cortan a
//         la mitad por falta de espacio en la columna Descripción.
//       - Corregido: el indicador "— con filtros aplicados" de los reportes
//         (PDF/Excel) no consideraba el buscador de texto, solo el filtro en
//         cascada.
//       - Legibilidad mejorada en varios textos secundarios de la pantalla
//         (mensaje de carga del Excel, estado vacío, subtítulo del modal de
//         comentario).
//
//   · Resumen (todas las áreas excepto Tiras de Bobinas): el botón 👽
//     (Movimientos Odoo) de cada código ahora muestra una burbuja de
//     notificación naranja con la cantidad de movimientos en estado
//     Pendiente/Mala digitación/??? — visible tanto en la tabla principal de
//     Resumen como en el Reporte Interactivo (aplica igual al verlo desde PT o
//     al descargar el HTML, ya que ambas opciones generan el mismo archivo).
//
//   · CORREGIDO — Perfil Transporte: el botón "📄 PDF" (usado en Despachos y en
//     Evidencia de Transporte) a veces abría la pestaña con el reporte pero no
//     disparaba automáticamente el diálogo de imprimir/guardar como PDF del
//     navegador. Causa: el `print()` se llamaba desde la ventana que abrió el
//     reporte, después de navegarla a una URL de blob — patrón frágil que en
//     algunos navegadores pierde el permiso de interacción reciente del usuario
//     tras la navegación. Corregido moviendo el disparo de `print()` a un
//     `<script>` embebido dentro del propio HTML del reporte (se autoejecuta al
//     cargar), igual patrón que ya usaban con éxito otros reportes del sistema.
//     Aplica a `generarPDFDespacho` y `generarPDFTransporte`.
//
//   · NUEVO (solo Lámina) — "Ficha Digital" en la pestaña Mapa: reemplaza el
//     flujo de trabajo con papel físico (contar la torre → escribir una ficha a
//     mano → pegarla en la torre → fotografiarla en Torres → que la IA la lea).
//       - Al tocar cualquier cuadro del Mapa se abre un modal grande y editable
//         (antes solo mostraba una vista de solo lectura). Si la posición ya
//         tenía una torre registrada, sus códigos se precargan; si está vacía,
//         arranca sin líneas.
//       - Cada línea se agrega con el botón "➕ Agregar código", que ofrece dos
//         formas de elegir: Código Rápido (con filtro en vivo dígito por dígito)
//         y un buscador por palabras clave (encuentra coincidencias sin importar
//         el orden en que se escriban las palabras ni tildes, comparando solo
//         contra la descripción — comparar también contra el código traía falsos
//         positivos, ya que números cortos como "10" aparecen dentro de
//         cualquier código largo sin relación real con la búsqueda). Ambos
//         buscan contra la tabla "Base Odoo (referencia)" (código+descripción
//         cruda de Odoo, sin características).
//       - Cada código elegido se cruza automáticamente por código (no por
//         características) contra la Tabla PT vieja: si existe en ambas, la
//         línea se completa con descripción y peso-por-unidad; si existe en Odoo
//         pero todavía no está dado de alta en la Tabla PT, se muestra un aviso
//         con un botón para crearlo ahí mismo (reutiliza el formulario de alta
//         de producto ya existente, precargado con código y descripción) — al
//         guardarlo, la línea se agrega sola y la ficha se reabre donde quedó.
//       - Resultados de búsqueda con 1 solo resultado, o exactamente 2 cuando
//         son el mismo producto en 1RA y 2DA, se resaltan en verde/naranja para
//         identificarlos de un vistazo; con 3 o más resultados no se pinta nada.
//       - Cada línea tiene Código, Descripción completa de Odoo, Cantidad
//         (editable, con clic para seleccionar todo el texto, y soporte para
//         escribir operaciones matemáticas simples como "500+200" que se
//         resuelven automáticamente al salir del campo) y Peso, calculado en
//         vivo como Cantidad × Kg/U de la Tabla PT.
//       - Al guardar, sobreescribe esa posición en el Mapa y reemplaza los
//         registros de Conteo Parcial de esa Área+Línea — mismo criterio que ya
//         usaba el flujo de foto + IA de Torres, así queda 100% integrado con
//         Resumen y el resto de reportes sin necesitar ningún cambio adicional.
//       - CORREGIDO — si se borraban todas las líneas de una ficha para vaciar
//         una torre existente, "Guardar" lo rechazaba (exigía al menos un
//         código con unidades) y no había forma de quitar el registro. Ahora,
//         guardar una ficha vacía pide confirmación y borra por completo esa
//         posición del Mapa y sus registros de Conteo Parcial asociados.
//   · La pestaña "📸 Torres" (foto + IA) queda oculta de la navegación — su
//     resultado final es el mismo que ahora logra la Ficha Digital sin el paso
//     de papel, pero el código se conserva intacto por si hace falta
//     reactivarla más adelante.
//
//   · Auditoría de esta entrega: validación de sintaxis (parser Acorn + `new
//     Function()`) en los 10 bloques `<script>` tras cada cambio, diffs
//     dirigidos para confirmar que cada edición tocó únicamente lo esperado, y
//     baterías de pruebas automatizadas con datos reales (625 filas del Excel
//     de Quants de Tiras, más escenarios simulados de la Ficha Digital) —
//     incluyendo casos límite (lotes con formato irregular, códigos sin peso
//     cargado, intentos de inyección de código en el campo de Cantidad,
//     búsquedas con 1/2/3+ resultados). Revisión final cruzando todo el
//     archivo: sin handlers huérfanos, sin variables duplicadas, sin IDs
//     inexistentes, y confirmado que los ganchos agregados a funciones
//     compartidas (`guardarProducto`, `renderResumen`) quedan inertes para
//     cualquier área o perfil que no use la Ficha Digital.
//
// ── Conteo PT — Service Worker v4.62.2 ─────────────────────────────────────
// Cambios v4.58.7 – v4.62.2 (Resumen, Tabla PT, Operaciones):
//   · Reporte Interactivo (Resumen): en vista Físico vs Papelería la columna
//     "Cantidad" se separó en Físico + Parcial; en vista Físico vs Sistema se
//     separó en Físico + Odoo Ajustado. En ambas vistas se ocultan los
//     códigos con las dos referencias en 0, y el orden por defecto quedó
//     fijo por Físico de mayor a menor. Excluido Tiras de Bobinas (conserva
//     su comportamiento original de una sola columna, sin ocultar ni
//     reordenar).
//   · Botón "Generar Reporte" (PDF): mismas columnas dobles, mismo
//     ocultamiento de códigos 0/0 (con KPIs recalculados sobre ese set
//     filtrado) y mismo orden por Físico descendente en la tabla "Detalle
//     por Código". Auditoría y Reporte Excel sin cambios. Excluido Tiras de
//     Bobinas.
//   · Tabla PT: nuevo botón "🗂 Base Odoo (referencia)" — tabla global
//     (compartida entre las 5 áreas) de código+descripción cruda tal como
//     aparece en Odoo, separada por completo de la Tabla PT (no crea ni
//     modifica productos). Se carga pegando texto "[código] Descripción";
//     cada carga reemplaza la anterior. Nuevo botón "👁 Ver" para buscar
//     dentro de esa tabla.
//   · Operaciones → Crear despacho: nuevo botón "📸 Escanear hoja con IA".
//     Lee una foto con varias líneas de producto (sin código, solo
//     características) vía Cloud Function analizarHojaDespacho, prioriza el
//     emparejamiento contra la Base Odoo (referencia) para obtener el
//     código exacto y, como respaldo, empareja por características
//     (tipo/material/medida/espesor/calidad). Modal de revisión con 4
//     categorías: de esta área (editable, se agregan las marcadas), de otra
//     área, código Odoo confirmado pero sin alta en ninguna Tabla PT, y no
//     identificados. Excluido Tiras de Bobinas (modelo de código+lote+peso
//     en kg, pendiente de adaptar).
//   · Bodega de Segunda → Conteo Parcial → "Escanear boleta con IA": mismo
//     criterio de prioridad — ahora intenta primero la Base Odoo
//     (referencia) antes de caer al respaldo por comparación directa de
//     descripción contra la Tabla PT.
//   · Corregido apilamiento (z-index) de 2 modales que se dibujaban detrás
//     de otro modal abierto encima por compartir el mismo z-index: el modal
//     de revisión de hoja escaneada (Operaciones) y el modal de
//     confirmación al reemplazar la Base Odoo (Tabla PT).
//
// ── Conteo PT — Service Worker v4.58.6 ─────────────────────────────────────
// Cambios v4.58.6:
//   · Estrellitas del destello final: agrandadas (9px → 16px) y ahora
//     viajan mucho más lejos del círculo (54-76px → 92-130px), para que
//     se noten claramente saliendo del logo hacia el fondo negro en vez
//     de quedarse pegadas al borde.
//
// ── Conteo PT — Service Worker v4.58.5 ─────────────────────────────────────
// Cambios v4.58.5:
//   · Causa real de que el destello final y las estrellas no se vieran:
//     las animaciones arrancaban con temporizadores fijos desde que
//     empezaba a cargar la página — si el JavaScript pesado de la app
//     (Firebase, gráficas, etc.) mantenía ocupado al navegador justo en
//     esos segundos, el destello final podía "pasar" sin llegar a
//     pintarse nunca, aunque las partes más tempranas (logo, rayo) sí se
//     alcanzaban a ver.
//   · Corregido de raíz: toda la secuencia de animación (entrada del logo,
//     destello interno, rayo, destello final, estrellas) ahora arranca
//     recién cuando la página ya terminó de cargar por completo (evento
//     "load" + doble frame de margen), agregando la clase .play — nunca
//     antes. El overlay se oculta según la duración real de la secuencia
//     contada desde ese momento, no desde el inicio de la carga.
//
// ── Conteo PT — Service Worker v4.58.4 ─────────────────────────────────────
// Cambios v4.58.4:
//   · Las estrellitas de v4.58.3 (carácter de texto "✦") no se veían en la
//     app instalada — probable glifo faltante en la fuente del WebView.
//     Reemplazadas por círculos pequeños con radial-gradient (misma
//     técnica ya comprobada del punto de luz que orbita el círculo), sin
//     depender de ningún carácter especial.
//
// ── Conteo PT — Service Worker v4.58.3 ─────────────────────────────────────
// Cambios v4.58.3:
//   · Agregadas 8 estrellitas (✦) amarillas que explotan hacia afuera en
//     distintas direcciones justo en el momento del destello final del
//     logo — mismo color y sincronizadas con el burst (0.7s). Solo usa
//     transform/opacity (misma técnica compatible del punto de luz de
//     v4.58.2, nada de mask-image).
//
// ── Conteo PT — Service Worker v4.58.2 ─────────────────────────────────────
// Cambios v4.58.2:
//   · El rayo de luz de v4.58.1 no se veía en la app instalada (usaba
//     conic-gradient + mask-image, con soporte inconsistente en varios
//     WebViews de Android). Reemplazado por un punto de luz que orbita el
//     borde del círculo usando solo transform:rotate() — misma vuelta
//     completa de 1.1s, mismo resultado visual, pero con soporte mucho más
//     amplio (nada de mask-image). El resto de la secuencia (entrada del
//     logo, destello interno, destello final) no cambió.
//
// ── Conteo PT — Service Worker v4.58.1 ─────────────────────────────────────
// Cambios v4.58.1:
//   · Pantalla de transición: nuevo rayo de luz amarillo que empieza arriba
//     del círculo y da una vuelta completa por el borde (1.1s), volviendo
//     al mismo punto — con blur y drop-shadow para que se note saliendo
//     del logo hacia el fondo negro, no encerrado dentro del círculo
//     blanco. Al completar la vuelta, un destello final se expande
//     brevemente por todo el contorno.
//   · Tiempo mínimo visible del overlay ajustado de 1.8s a 2.4s para cubrir
//     toda la secuencia nueva (entrada del logo + rayo + destello final).
//
// ── Conteo PT — Service Worker v4.58.0 ─────────────────────────────────────
// Cambios v4.58.0:
//   · Logo de la pantalla de transición (overlay al cambiar de Área/
//     Planta): nueva animación de entrada — aparece chico girando como
//     moneda (rotateY), hace un pequeño rebote de escala al asentarse
//     (~0.7s), y justo ahí pasa un destello de luz una sola vez (no en
//     bucle, ~0.55s) cruzando el logo. El pulso de borde que ya tenía
//     sigue después, sin más movimiento, para no marear si la carga tarda.
//   · La pantalla ahora se queda visible un mínimo de 1.8s aunque la carga
//     real de la página termine antes — así la animación de entrada
//     siempre se alcanza a ver completa, nunca se corta a medias.
//
// ── Conteo PT — Service Worker v4.57.9 ─────────────────────────────────────
// Cambios v4.57.9:
//   · Logo Cóndor (login y pantalla de transición): se quitó un padding
//     duplicado que tenía la imagen por dentro además del que ya traía el
//     marco blanco — el logo se veía más chico de lo necesario. Además se
//     redujo el padding del marco (14px → 6px) para que el logo ocupe casi
//     todo el espacio del cuadro blanco, sin agrandar el cuadro en sí.
//
// ── Conteo PT — Service Worker v4.57.8 ─────────────────────────────────────
// Cambios v4.57.8:
//   · Nueva foto img11.jpg agregada al slideshow de fondo de la pantalla
//     de login (antes solo img1.jpeg a img7.jpeg). No necesita precarga
//     explícita en ASSETS — las imágenes del slideshow se cachean solas al
//     primer uso gracias al stale-while-revalidate de v4.57.6.
//
// ── Conteo PT — Service Worker v4.57.7 ─────────────────────────────────────
// Cambios v4.57.7:
//   · Logo del login agrandado de nuevo (120px/50% → 150px/58%).
//   · Logo de la pantalla de transición (overlay al cambiar de Área/Planta)
//     reducido (255px → 175px) y con el mismo efecto "moneda reluciente"
//     (barra de luz en bucle) que ya tenía el logo del login — antes solo
//     tenía el pulso de borde.
//
// ── Conteo PT — Service Worker v4.57.6 ─────────────────────────────────────
// Cambios v4.57.6:
//   · Las imágenes (img1...img10, .png/.jpeg) pasaron de estrategia
//     "cache-first" (se quedaban en caché para siempre, sin importar que
//     se reemplazara el archivo con el mismo nombre en GitHub) a
//     "stale-while-revalidate": se sigue mostrando la copia en caché al
//     instante (rápido, funciona offline), pero en paralelo se pide la
//     versión nueva y se actualiza la caché en segundo plano — la
//     SIGUIENTE vez que se pida esa imagen ya sale actualizada, sin
//     esperar a subir una nueva versión del sistema. index.html sigue
//     siendo network-first (sin cambios); el resto de assets (manifest,
//     ícono) siguen cache-first (sin cambios).
//
// ── Conteo PT — Service Worker v4.57.5 ─────────────────────────────────────
// Cambios v4.57.5:
//   · Login: la barra de scroll no dejaba llegar hasta arriba/abajo del
//     todo cuando el contenido era más alto que la pantalla. Causa: el
//     contenedor usaba align-items:center junto con overflow-y:auto —
//     combinación que recorta el extremo superior del scroll en flexbox.
//     Corregido centrando la tarjeta con margin:auto en vez de
//     align-items:center — mismo centrado visual, scroll completo.
//
// ── Conteo PT — Service Worker v4.57.4 ─────────────────────────────────────
// Cambios v4.57.4:
//   · Logo Cóndor de la pantalla de login agrandado (92px/40% → 120px/50%).
//
// ── Conteo PT — Service Worker v4.57.3 ─────────────────────────────────────
// Cambios v4.57.3:
//   · El mismo bug de favicon de v4.57.2 (globo genérico en vez del logo
//     Conteo PT) estaba presente en TODOS los demás reportes que abren
//     ventana nueva, no solo el PDF de Despacho: Resumen (Físico vs
//     Sistema/Papelería, Tiras de Bobinas), Auditoría (PDF e Interactivo),
//     Reporte PDF de Resumen, Reportes de Entradas/Salidas (MO/SRO) desde
//     Operaciones, PDF de Transporte y Reporte de Stock Odoo (Tiras).
//     Corregidos los 8 — todos navegan ahora a una URL de blob real en vez
//     de escribir el HTML sobre about:blank. El de Transporte además tenía
//     el mismo problema de bloqueo de popup que Despacho (await antes de
//     abrir la ventana) — corregido con el mismo patrón de dos pasos.
//
// ── Conteo PT — Service Worker v4.57.2 ─────────────────────────────────────
// Cambios v4.57.2:
//   · Operaciones → botón "📄 PDF" de un despacho: la pestaña abría con el
//     ícono genérico del navegador (globo) en vez del logo Conteo PT.
//     Causa: el fix de v4.57.0 pasó a escribir el HTML con document.write()
//     sobre about:blank para evitar el bloqueo de popups, pero esas páginas
//     no cargan el favicon de forma confiable en varios navegadores.
//     Corregido: la ventana se sigue abriendo de inmediato (sin bloqueo),
//     pero ahora se navega hacia una URL de blob real — que sí aplica el
//     favicon — en vez de escribir el HTML directo.
//
// ── Conteo PT — Service Worker v4.57.1 ─────────────────────────────────────
// Cambios v4.57.1:
//   · Generación automática de PDF al guardar un Despacho/Recepción (flujo
//     interno, hoy sin botón/checkbox conectado en la UI): la ventana del
//     PDF ahora se abre de forma síncrona en el mismo clic de "Guardar"
//     (antes de cualquier await) en vez de con setTimeout después de
//     guardar — mismo criterio que el fix de v4.57.0, para que no quede
//     bloqueada como popup si en el futuro se conecta un control en la UI.
//
// ── Conteo PT — Service Worker v4.57.0 ─────────────────────────────────────
// Cambios v4.57.0:
//   · Corregidos 2 textos "BSM" que quedaban fijos sin importar la planta
//     activa: el campo "Ubicación" del Reporte de Justificación (ahora dice
//     "Central Álamos/Stock" en esa planta) y el destino automático al
//     recibir por "Producción" (ahora dice "PRODUCCIÓN DE LA PLANTA CENTRAL
//     ÁLAMOS" en esa planta). BSM no cambia de texto en ningún caso.
//   · Nombre de archivo del Reporte de Justificación: ahora usa el mismo
//     prefijo de planta que el resto de reportes (_areaFileTag()), evita
//     que se confunda con el mismo reporte de BSM.
//   · Operaciones → botón "📄 PDF" de un despacho: no abría el diálogo de
//     impresión/guardar del navegador. Causa: la función esperaba (await) a
//     Firestore para cargar las fotos ANTES de abrir la ventana — al
//     romperse la cadena síncrona del clic, el navegador bloqueaba el
//     popup en silencio. Corregido: la ventana se abre de inmediato al
//     hacer clic (con un "Generando PDF…" mientras carga) y se llena con
//     el contenido final cuando está listo — mismo patrón que ya usan
//     Transporte y Auditoría.
//
// ── Conteo PT — Service Worker v4.56.0 ─────────────────────────────────────
// Cambios v4.56.0:
//   · Tabla PT: el botón "📥 Importar códigos desde Excel" fue reemplazado
//     por "📋 Pegar códigos nuevos" — en vez de generar y subir un Excel,
//     ahora se pega directo el texto tal como lo muestra Odoo (una línea
//     por código, formato "[código] Descripción") en un modal con
//     textarea. Misma lógica de parsing, protección por PIN, verificación
//     de duplicados (nunca toca códigos que ya existen) y resumen final
//     que ya tenía el importador de Excel — solo cambió el origen del
//     texto. Disponible en las 5 áreas.
//
// ── Conteo PT — Service Worker v4.55.2 ─────────────────────────────────────
// Cambios v4.55.2:
//   · Cambiar de Planta (BSM ↔ Central Álamos) ahora muestra el mismo
//     overlay de transición con logo pulsante y barra de progreso que ya
//     se usaba al cambiar de Área — antes solo mostraba un aviso simple.
//   · Cambiar de Planta ahora limpia la sesión activa (sessionStorage)
//     antes de recargar: cada Planta tiene sus propios PINs de perfil, así
//     que ya no se restaura automáticamente la sesión de la Planta
//     anterior — vuelve a pedir el login (con el logo) como corresponde.
//
// ── Conteo PT — Service Worker v4.55.1 ─────────────────────────────────────
// Cambios v4.55.1:
//   · El código de acceso para cambiar de Planta ahora se pide en un modal
//     centrado en pantalla, en vez de expandirse dentro de la tarjeta de
//     selección.
//   · Logo Cóndor de la pantalla de login reducido (se veía pixelado por
//     estar sobredimensionado).
//
// ── Conteo PT — Service Worker v4.55.0 ─────────────────────────────────────
// Cambios v4.55.0:
//   · Logo del overlay de transición un 25% más chico (min(50vw,50vh)/
//     340px → min(37.5vw,37.5vh)/255px).
//
// ── Conteo PT — Service Worker v4.54.0 ─────────────────────────────────────
// Cambios v4.54.0:
//   · El "Cargando..." de la tarjeta "Área/Planta seleccionada" (la que
//     aparece justo antes del overlay de transición) ahora es más grande
//     y con mejor contraste, igual criterio que el resto de mensajes
//     secundarios mejorados en v4.53.0.
//
// ── Conteo PT — Service Worker v4.53.0 ─────────────────────────────────────
// Cambios v4.53.0:
//   · Mensajes secundarios chicos y apagados en pantallas de carga ("Por
//     favor espera", "Por favor espera, no cierres esta ventana",
//     "Subiendo imagen...") ahora son más grandes y con mejor contraste
//     en las 5 pantallas donde aparecen (overlay de transición de área,
//     carga/eliminación de Stock Odoo de Tiras, subida de fotos de
//     producto).
//
// ── Conteo PT — Service Worker v4.52.0 ─────────────────────────────────────
// Cambios v4.52.0:
//   · El botón "📥 Importar códigos desde Excel" en Tabla PT ahora pide
//     el PIN 2907 antes de abrir el selector de archivo — mismo mecanismo
//     que ya usan "Normalizar espesores", "Normalizar medidas", etc.
//
// ── Conteo PT — Service Worker v4.51.0 ─────────────────────────────────────
// Cambios v4.51.0:
//   · Overlay de transición: logo ahora ocupa la mitad de la pantalla en
//     celular (min(50vw,50vh), con tope de 340px para no verse absurdo en
//     pantallas grandes de escritorio). Insignia de emoji reajustada
//     proporcionalmente con el mismo criterio responsivo.
//
// ── Conteo PT — Service Worker v4.50.0 ─────────────────────────────────────
// Cambios v4.50.0:
//   · Overlay de transición: logo de la empresa más grande (76px → 120px),
//     insignia de emoji reajustada proporcionalmente.
//
// ── Conteo PT — Service Worker v4.49.0 ─────────────────────────────────────
// Cambios v4.49.0:
//   · NUEVO botón "📥 Importar códigos desde Excel" en Tabla PT — disponible
//     en las 5 áreas. Sube un Excel de una sola columna con filas tipo
//     "[código] Descripción" (mismo formato que ya usa el sistema en
//     reportes/Odoo) y crea automáticamente los productos que falten:
//       - Calidad se deduce del prefijo del código (2- = 2DA CALIDAD).
//       - Tipo/Material/Medida/Pies/Espesor se extraen de la descripción
//         (reconoce Tubo Cuadrado/Rectangular/Redondo/Proceso, Costanera,
//         Lámina Ondulada/Lisa/Troquelada y sus variantes, y Tira Lámina).
//       - Unidades/Atado = 1 fijo, Peso queda vacío (no vienen en el Excel).
//       - Códigos que YA existen en la Tabla PT de esa área NUNCA se tocan
//         — se listan al final para revisar, junto con los que no se
//         pudieron reconocer completo (se crean igual, con lo que sí se
//         pudo leer, marcados para completar Tipo/Material a mano).
//   · Verificado con una batería de 242 pruebas automatizadas, incluyendo
//     el flujo completo de importación simulado de punta a punta.
//
// ── Conteo PT — Service Worker v4.48.0 ─────────────────────────────────────
// Cambios v4.48.0 (corrección de emojis):
//   · _areaMeta() y el overlay de transición usaban puntos de colores
//     (🔵🟠🟢) como ícono de Tubería/Costanera/Lámina, en vez de los
//     emojis reales de cada tarjeta. Corregido: ahora usan exactamente
//     🔧 Tubería, 🏗️ Costanera, 🧱 Lámina (Tiras 🧲 y Bodega de Segunda
//     🥈 ya estaban correctos). Esto corrige de una sola vez la insignia
//     del overlay de transición, el badge del header, y el mensaje
//     "Área X seleccionada" — los tres leen de la misma función.
//   · Verificado con una batería de 210 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.47.0 ─────────────────────────────────────
// Cambios v4.47.0:
//   · Pantalla de transición al cambiar de Área/cerrar perfil rediseñada:
//     el spinner circular genérico se reemplazó por el logo Cóndor con un
//     pulso sutil, más una insignia pequeña con el mismo emoji de la
//     tarjeta del área (🔵🟠🟢🧲🥈), y una barra de progreso lineal arriba
//     de toda la pantalla con el color del área — en vez del círculo
//     girando de antes.
//   · Verificado con una batería de 202 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.46.0 ─────────────────────────────────────
// Cambios v4.46.0:
//   · Efecto visual en las tarjetas seleccionadas (Planta/Área/Perfil):
//     la tarjeta activa queda con elevación + resplandor de su propio
//     color (box-shadow), fijo mientras siga elegida; además, al hacer
//     clic en cualquier tarjeta, un pulso breve (~0.28s) da feedback
//     inmediato del clic antes de que aparezca el PIN o recargue la
//     página. Mismo color que ya usaba cada tarjeta — sin agregar
//     ningún ícono ni elemento nuevo.
//   · Verificado con una batería de 192 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.45.0 ─────────────────────────────────────
// Cambios v4.45.0:
//   · Tipografía de las tarjetas de Planta/Área/Perfil y de los PINs del
//     login: de "Barlow Condensed" en negrita fuerte (800, mayúsculas) a
//     "Barlow" sin negrita (peso 400-500) — más legible y profesional.
//     La disposición fija (todo visible desde el inicio) no cambió.
//   · Verificado con una batería de 179 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.44.0 ─────────────────────────────────────
// Cambios v4.44.0 (ajuste tras feedback):
//   · Se quitó por completo el gate de v4.43.0 — ya no se oculta nada al
//     entrar al login. Planta, Área y Perfil quedan fijos y visibles todos
//     juntos desde el arranque, como estaban desde el principio.
//   · Cambiar de Planta a una distinta sigue pidiendo el código de acceso
//     (acceso2026) — eso no cambió, solo se quitó el ocultar/revelar del
//     resto de la pantalla.
//   · Verificado con una batería de 175 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.43.0 ─────────────────────────────────────
// Cambios v4.43.0 (ajuste tras feedback):
//   · Se revirtió el wizard colapsable de v4.42.0 — las tarjetas de Área y
//     Perfil vuelven a su estilo/tipografía original (Barlow Condensed).
//   · Se mantiene únicamente el gate de Planta: al entrar al login solo se
//     ven las 2 tarjetas de Planta (BSM / Central Álamos); al elegir una
//     (con su código de acceso si es distinta a la actual) se revela todo
//     lo demás (Área + Perfil) de una sola vez, como estaba antes de
//     agregar la Planta.
//   · Verificado con una batería de 176 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.42.0 ─────────────────────────────────────
// Cambios v4.42.0:
//   · Pantalla de login rediseñada como wizard colapsable de 3 pasos
//     (Planta → Área → Perfil): cada paso ya resuelto se colapsa a una
//     barra de resumen ("🏭 Planta BSM  Cambiar") y el siguiente se
//     expande debajo. Tocar "Cambiar" reabre ese paso sin perder los
//     demás; "Cancelar" vuelve atrás sin modificar nada. Misma lógica de
//     PINs y guardado de siempre — solo cambió cómo se presenta.
//   · Tipografía del login cambiada de "Barlow Condensed" en negrita
//     (700-900) a "Barlow" sin negrita (peso 400-600) — más legible y
//     profesional. Sin cambios de fuente en el resto de la aplicación.
//   · Verificado con una batería de 189 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.41.0 ─────────────────────────────────────
// Cambios v4.41.0 (cierre de pendientes de Central Álamos):
//   · Chat interno y "quién está en línea" (_presencia) ahora aislados por
//     planta (colGlobal(), mismo patrón que colArea()) — un usuario de
//     Central Álamos ya no ve mensajes ni presencia de gente de BSM, y
//     viceversa. BSM sigue usando las rutas de siempre, sin cambios.
//   · Pantalla "Almacenamiento" (PIN 2907): ahora consulta las 10 áreas
//     (5 de BSM + 5 de Central Álamos) y muestra el total combinado.
//   · Rutas de Firebase Storage (PDFs de movimientos y fotos de producto)
//     ahora incluyen la planta cuando no es BSM, para que los archivos de
//     ambas plantas queden organizados en carpetas separadas.
//   · Nombres de archivo de reportes exportados (PDF/Excel/HTML): cuando
//     la planta activa es Central Álamos, se antepone "CentralAlamos_" al
//     nombre — evita que un reporte de esa planta se confunda con el
//     mismo área de BSM. Los reportes de BSM no cambian de nombre.
//   · Nuevo badge "🏭 PLANTA BSM" / "🏢 CENTRAL ÁLAMOS" en el header,
//     junto al badge de área — siempre visible en qué planta se está
//     trabajando (oculto en móvil, igual que el de área).
//   · Verificado con una batería de 156 pruebas automatizadas, sin cambios
//     de comportamiento en la Planta BSM.
//
// ── Conteo PT — Service Worker v4.40.0 ─────────────────────────────────────
// Cambios v4.40.0:
//   · Selector de Planta (BSM ↔ Central Álamos): emojis intercambiados
//     (BSM = 🏭, Central Álamos = 🏢), agregado el mismo efecto de
//     "Cargando..." que ya existía al elegir un Área, y ahora requiere un
//     código de acceso (acceso2026) antes de permitir cambiar de planta —
//     si el código es incorrecto, no cambia nada; si es correcto, recién
//     ahí se guarda la selección y se recarga.
//
// ── Conteo PT — Service Worker v4.39.0 ─────────────────────────────────────
// Cambios v4.39.0:
//   · NUEVA PLANTA "🏭 Central Álamos" — mismo flujo y mismas 5 áreas +
//     2 perfiles que la Planta BSM (Tubería, Costanera, Lámina, Tiras de
//     Bobinas, Bodega de Segunda / Verificador Inventario, Verificador
//     Operaciones), pero completamente aislada e independiente:
//       - Nuevo selector de Planta en la pantalla de login, arriba del
//         selector de Área — se recuerda en el dispositivo igual que el
//         área (localStorage), sin afectar la selección de área existente.
//       - colArea() extendida: cuando la planta activa es Central Álamos,
//         todas las rutas de Firestore quedan bajo
//         plantas/central_alamos/areas/{área}/{colección} — aislamiento
//         total, mismo mecanismo que ya separa las 5 áreas entre sí. La
//         Planta BSM sigue usando exactamente las mismas rutas de
//         siempre (verificado con pruebas automatizadas), cero riesgo
//         para los datos ya existentes.
//       - PINs completamente independientes por planta: los 10 PINs de
//         área (Inventario/Operaciones × 5 áreas), más Transporte,
//         Borrado y Bitácora, todos con valores propios para Central
//         Álamos, editables en un solo bloque del código. El PIN 2907
//         (Conteo General / Auditoría / Almacenamiento) queda fijo y
//         compartido entre ambas plantas, a pedido.
//       - Tabla PT de Central Álamos arranca vacía — se carga
//         manualmente como cualquier producto nuevo, mismo formulario ya
//         existente.
//   · Sin cambios de comportamiento en la Planta BSM (Tubería, Costanera,
//     Lámina, Tiras de Bobinas, Bodega de Segunda) — verificado con una
//     batería de 132 pruebas automatizadas.
//
// ── Conteo PT — Service Worker v4.38.0 ─────────────────────────────────────
// Cambios v4.38.0:
//   · FAVICON de reportes/PDF: las 9 pestañas HTML que se abrían con el
//     logo viejo de Conteo PT (Resumen, Auditoría, Reporte interactivo,
//     WhatsApp de despacho, Movimiento, genérico, Transporte, Stock de
//     Tiras) ahora usan el logo naranja actual, incrustado como una sola
//     constante reutilizada (FAVICON_PT_BASE64) en vez de 9 copias sueltas.
//     No aplica a archivos .pdf reales ya descargados/reabiertos — eso lo
//     controla el visor de PDF del sistema operativo, fuera de Conteo PT.
//   · Legibilidad de modales: el texto de confirmaciones, PINs y avisos
//     (que se veía gris apagado) ahora usa el color de texto principal y
//     letra más grande — aplica a todos los modales del sistema.
//   · NUEVA ÁREA "🥈 Bodega de Segunda" — mezcla en una sola Tabla PT los
//     códigos 2DA CALIDAD de Tubería + Costanera + Lámina (aislada en
//     Firebase, sin relación con las otras 4 áreas):
//       - Carga inicial de 92 productos base extraídos de un reporte Odoo
//         Quants (deduplicados de 105 filas), Unidades/Atado = 1 fijo
//         (esta bodega trabaja por unidad, no por atado).
//       - Formulario "Agregar/Editar Producto" adaptado: el selector de
//         Tipo combina las 3 familias (Tubo/Costanera/Lámina) y el de
//         Material combina Aluzinc/Galvanizado/Negro; los campos Pies/
//         Medida se muestran según el TIPO elegido, no según el área.
//       - Opción "➕ Otro (escribir nuevo tipo)" en el selector de Tipo,
//         extendida a TODAS las áreas (no solo Bodega de Segunda), con
//         memoria automática: un tipo personalizado ya guardado aparece
//         como opción normal la próxima vez, sin volver a escribirlo.
//       - Los 6 selectores de Pies (Conteo, MO, SRO, BNC, Despacho,
//         Registro Agrupado) y los botones cíclicos de Tipo/Material
//         adaptados para reconocer las 3 familias mezcladas.
//       - Botón "📷 Escanear boleta con IA" (Conteo Parcial) — reciclado
//         del que antes usaba Tiras de Bobinas (ya no se usa ahí, se quitó
//         ese botón). Lee una boleta de empaque con VARIAS líneas de
//         producto (antes leía una sola tira), matchea cada línea contra
//         la Tabla PT por código si la boleta lo trae, o por descripción
//         si no — nunca guarda solo, las líneas encontradas se agregan a
//         "Productos agregados" para revisar antes de confirmar el conteo.
//         Requiere el redespliegue correspondiente de la Cloud Function
//         analizarTiraLamina (mismo endpoint, lógica interna actualizada).
//   · Auditoría de borrado automático de datos: revisados los 24 listeners
//     onSnapshot del sistema — ninguno borra ni sobreescribe datos al
//     recibir cambios de Firebase. El único borrado automático existente
//     (limpieza de mensajes viejos del chat interno) está acotado a esa
//     colección exclusivamente, sin tocar inventario/operaciones.
//   · Sin cambios de comportamiento en Tubería, Costanera, Lámina ni Tiras
//     de Bobinas — verificado con una batería de 102 pruebas automatizadas
//     más comparación función por función contra la versión anterior.
//
// ── Conteo PT — Service Worker v4.37.0 ─────────────────────────────────────
// Cambios v4.37.0:
//   · Pantalla de selección de perfil: la tarjeta "Verificador Operaciones"
//     (perfil "salida") ahora se oculta por completo cuando el área activa
//     es Tiras de Bobinas — no aparece ni en escritorio ni en celular (es
//     la misma pantalla para ambos). El grid de tarjetas se reacomoda solo
//     (1, 2 o 3 columnas) según cuántas queden visibles. También se
//     bloquea una sesión guardada con ese perfil si se cambia a Tiras de
//     Bobinas, mismo criterio que ya existía para Transporte.
//
// ── Conteo PT — Service Worker v4.36.1 ─────────────────────────────────────
// Cambios v4.20.1 → v4.36.1:
//   · Entradas/Salidas (Operaciones): NUEVO ícono 🟢/🔴 en la esquina
//     superior izquierda de cada tarjeta para activar/desactivar el
//     registro completo (protegido con PIN 2907, mismo modal que Conteo
//     General). Un registro desactivado sigue visible en la lista pero se
//     excluye del cálculo del Resumen (entradasTodas/salidasTodas →
//     Físico Operado) para todos sus códigos, sin borrarse ni moverse de
//     lugar. Aplica a las 5 áreas por igual (transversal, sin condicional
//     de área).
//   · NUEVA PESTAÑA "🧵 Stock Odoo" — exclusiva del área Tiras de Bobinas,
//     100% aislada vía colArea('tiras_stock') (no existe en las otras 4
//     áreas). Conteo físico por tira individual (código+lote), separado
//     del cuadre Odoo genérico existente:
//       - Subida del Excel de stock Odoo (Producto/Lote/Cantidad), un
//         documento por fila sin agrupar, autocompletando Tipo/Material/
//         Medida/Espesor desde Tabla PT por código.
//       - Detección de códigos del Excel que no existen en Tabla PT: modal
//         con lista y botón "➕ Crear código" por cada uno (precarga
//         Código+Descripción en el modal de Nuevo Producto, reabre la
//         lista con los pendientes tras guardar, y sincroniza
//         automáticamente Tipo/Material/Medida/Espesor en las tiras ya
//         cargadas de ese código).
//       - Botón "➕ Agregar tira manual" para tiras físicas que no
//         aparecen en el Excel — selectores en cascada Material→Tipo→
//         Espesor→Medida (mismo orden que usa Tiras en el resto del
//         sistema) con botones cíclicos (cycle-btn) y buscador de
//         "Código rápido", igual estilo que Registrar Movimiento/Conteo.
//         Quedan en una zona aparte "Agregadas manualmente" hasta
//         contabilizarse.
//       - Dos zonas visuales separadas (No contabilizadas / Contabilizadas)
//         con botón por tira para marcar/desmarcar, toast de confirmación
//         e indicador visual (borde y etiqueta verde) en la tarjeta.
//       - Comentario por tira individual (mismo modal que Entradas/
//         Salidas), visible en pantalla y en ambos reportes.
//       - Filtros por chips: Material, Tipo, Medida, Espesor, N° de Lote
//         (extraído del final del código de lote) y Peso — este último en
//         franjas/rangos calculados automáticamente según los pesos
//         cargados (nunca se listan pesos individuales).
//       - 4 tarjetas KPI (Contabilizadas / Faltan por contar / No aparecen
//         en Odoo / Total tiras) con click para filtrar la vista; click de
//         nuevo en la misma la quita.
//       - Reportes PDF (ventana con diálogo de impresión nativo, se abre
//         solo) y Excel, respetan los filtros/chips activos en pantalla.
//       - Botón "Eliminar/Limpiar datos" con PIN 2907 y overlay de
//         progreso en vivo ("Eliminando X de Y…").
//       - Overlay de progreso al subir el Excel ("Leyendo → Procesando →
//         Guardando X de Y…").
//   · Perfil Inventario (Verificador de Inventario) + área Tiras de
//     Bobinas: se ocultan todas las pestañas salvo Tabla PT y Stock Odoo
//     (escritorio y móvil), con acceso directo a Stock Odoo al iniciar
//     sesión. No afecta al perfil Inventario en ninguna otra área.
//   · CORREGIDO — bug de condición de carrera que obligaba a tocar
//     "Eliminar datos" dos veces en Stock Odoo para que borrara todo: se
//     le pasaba a la función de borrado el array en memoria en vivo, que
//     Firestore reescribía a mitad del proceso en cuanto llegaban las
//     primeras confirmaciones (si había más de 450 tiras, el límite de un
//     lote de Firestore). Ahora se usa una copia estática de la lista
//     antes de empezar a borrar.
//   · CORREGIDO — el botón "➕ Crear código" (dentro de Stock Odoo) no
//     reaccionaba al tocarlo si la descripción del producto traía
//     comillas: se armaba el onclick con texto interpolado directo. Ahora
//     se referencia por índice de lista, sin texto dinámico en el HTML.
//   · _commitEnLotes (función interna compartida, usada en 16 lugares del
//     sistema para escrituras/borrados masivos): ahora acepta un callback
//     de progreso opcional, sin cambiar el comportamiento de ninguna de
//     las llamadas existentes que no lo usan.
//   · Reportes: se agregó el ícono de la app (favicon) a 5 reportes que no
//     lo tenían — Físico vs Sistema/Papelería, Auditoría, y dos reportes
//     genéricos — porque las pestañas abiertas con window.open('','_blank')
//     no heredan el ícono del sitio en varios navegadores. Mismo problema
//     ya estaba resuelto en otros reportes desde antes; ahora queda parejo
//     en todos.
//   · Batería de pruebas automatizadas (jsdom + Firestore simulado)
//     ejecutando las funciones reales del sistema con datos de prueba:
//     42 pruebas, incluyendo reproducción exacta del bug de la condición
//     de carrera (900 tiras simuladas) y verificación de aislamiento por
//     área para toda la funcionalidad nueva.
//
// ── Conteo PT — Service Worker v4.21.0 ─────────────────────────────────────
// Cambios v4.21.0:
//   · Resumen: oculta la barra "COLUMNAS: / Ocultas / Mostrar todo" (era
//     ruido visual para el uso diario). Aplica a las 5 áreas.
//   · Resumen: NUEVO filtro de Calidad (1RA/2DA) en el panel de chips,
//     junto a Material/Tipo/Medida/Espesor, con la misma cascada (al
//     cambiar Calidad se resetean los demás filtros). Aplica a Tubería,
//     Costanera, Lámina y Bodega de Segunda (Tiras usa su propio Resumen
//     aislado, sin chips de calidad — no se tocó).
//   · Reportes: todos los reportes generados (Excel, PDF y HTML — Tabla PT,
//     Conteo General/Parcial, Resumen Físico vs Sistema/Papelería,
//     Auditoría, Reporte Interactivo, MOs/SROs, exportación Odoo) ahora
//     incluyen el área de origen y la fecha en su nombre de archivo/título,
//     con un formato unificado: Nombre_Área_DD.MM.AAAA_CONTEO.PT.
//   · CORREGIDO — Resumen: un código nuevo que llegaba por una MO/SRO/SO/
//     Ajuste ya finalizada (estado "INGRESADO"), sin haber sido contado
//     nunca en Conteo General, no aparecía en la tabla hasta contarlo en
//     Conteo Parcial. Ahora el Resumen también revisa el historial
//     completo de movimientos (no solo los pendientes) para crear esa fila.
//     Aplica a Tubería, Costanera, Lámina y Bodega de Segunda.
//   · CORREGIDO — mismo bug anterior, replicado en el PDF standalone
//     "Generar Reporte" (que tiene su propia lógica de agrupamiento,
//     separada del Resumen): ahora también crea la fila para códigos con
//     movimiento pendiente que todavía no están en la importación de Odoo.
//   · CORREGIDO — filas creadas automáticamente en Resumen/PDF sin ninguna
//     MO/SRO/SO/Ajuste con calidad definida mostraban "—" en vez de 1RA/2DA
//     aunque el código sí tuviera su calidad fija asignada en la Tabla PT.
//     Ahora se usa esa calidad de la Tabla PT como respaldo antes de caer
//     en "—". Corregido en los 3 lugares donde ocurría (Resumen: filas
//     solo-Odoo y filas huérfanas de movimientos; PDF standalone).
//   · Firestore: las escrituras masivas (normalización de medida/espesor,
//     migración de Código Corto, "Corregir valor por código", Torres, y
//     borrados de fotos de despachos/transportes) ahora se dividen en
//     bloques de máximo 450 operaciones. Antes, si la cantidad de
//     documentos afectados superaba el límite real de Firestore (500 por
//     batch), la operación completa se rechazaba en silencio. Sin cambios
//     de comportamiento cuando la cantidad es menor a 450 (que es el caso
//     de siempre hasta ahora).
//   · Tabla PT: al crear o editar un producto, los campos de texto libre
//     (Código, Pies en Lámina, y Uso/Destino-Grado-Categoría-Calibre en
//     Tiras) ahora se normalizan automáticamente — se quitan espacios de
//     más, se unifican comillas "curvas" a rectas, y se pasa a MAYÚSCULAS.
//     La Descripción solo se le limpian espacios/comillas (conserva su
//     formato de mayúsculas/minúsculas intencional). Calidad/Tipo/
//     Material/Color no se tocaron por venir de menús desplegables, no de
//     texto libre. Aplica a las 5 áreas, ya que comparten el mismo
//     formulario de producto.
//
// ── Conteo PT — Service Worker v4.20.0 ─────────────────────────────────────
// Cambios v4.20.0:
//   · Tiras de Bobinas — Odoo (Quants) 100% aislado del Odoo genérico: nueva
//     variable odooDataTiras y documento Firestore propio ('odoo_tiras',
//     separado de 'odoo'), indexado por código+lote (no por código). El
//     mapeador de columnas ahora detecta y pide también la columna Lote/Nº
//     de serie solo cuando el área activa es Tiras. Si el mismo código+lote
//     aparece 2 veces en el Excel, se suma en vez de sobrescribirse (el
//     Odoo genérico de las otras 4 áreas no se tocó ni un byte).
//   · Tiras de Bobinas — Resumen → Físico vs Papelería: NUEVA tabla propia,
//     agrupada por código+lote, con columnas Código, Lote, Tipo, Mat,
//     Medida, Espesor, 🔢 Tiras (Gral.), Físico (KG), 🔢 Tiras (Parcial),
//     Parcial (KG), Físico−Parcial (KG) y Estado. El thead se sobreescribe
//     solo mientras esta vista está activa y se restaura automáticamente
//     (incluyendo tamaño de letra) al cambiar de área o a la vista Sistema,
//     sin dejar rastro en las otras 4 áreas.
//   · Tiras de Bobinas — Resumen: selección de fila con clic (mismo
//     resaltado verde que el resto de la app, se conserva al cambiar de
//     pestaña y volver) y efecto de zoom al pasar el mouse sobre las
//     columnas numéricas, igual que en el Resumen general.
//   · Tiras de Bobinas — Resumen: grupos colapsables por estado (🔴
//     Faltantes / 🟡 Sobrantes / ✅ Exactos) con conteo de lotes y peso
//     total por grupo, igual que las demás áreas. Las tarjetas KPI
//     (Cuadran/Faltantes/Sobrantes/Total Físico) ahora expanden/colapsan el
//     grupo correspondiente al tocarlas.
//   · Tiras de Bobinas — Resumen: chips de filtro por Material/Tipo/Medida/
//     Espesor (para buscar un código específico; el Lote nunca es un chip,
//     es único por fila), reutilizando el mismo sistema de chips que las
//     otras áreas. Corregido bug de mayúsculas/minúsculas que hacía fallar
//     el filtro por Espesor (el chip comparaba en mayúsculas contra el dato
//     guardado en minúsculas).
//   · Tiras de Bobinas — Resumen: los botones "Generar Reporte" y "Reporte
//     Excel" ahora funcionan en la vista Físico vs Papelería (antes no
//     generaban nada porque dependían de una caché que solo llenaba el
//     Resumen genérico). Nuevas funciones dedicadas con KPIs + detalle
//     completo por lote, en HTML imprimible y Excel (2 hojas).
//   · Tiras de Bobinas — Conteo (General y Parcial): el botón "📤 Cargar
//     Excel (Quants)" ahora reconoce el formato de 3 columnas (Producto |
//     Lote/Nº de serie | Cantidad) y agrega cada lote directo a la lista
//     "Productos agregados" con su peso — funciona igual en ambos modos,
//     ya que comparten la misma lista antes de guardar. Si el mismo
//     código+lote aparece repetido en el Excel, se suma el peso.
//   · Tabla PT: eliminadas las columnas Uso/Destino, Grado, Categoría y
//     Calibre (y el botón 👁️ que las mostraba/ocultaba) por no aportar
//     valor en la práctica. El resto del feature (formulario de edición y
//     chips de filtro de esos campos) no se tocó.
//   · Auditoría completa de esta entrega: validación de sintaxis (parser +
//     new Function) en los 10 bloques <script>, diff línea por línea contra
//     la versión anterior (solo 14 líneas modificadas del código previo,
//     las 14 intencionales de este changelog — el resto son líneas nuevas),
//     y batería de pruebas de lógica pura (agrupación código+lote, import
//     de Odoo con datos reales, funciones de cálculo) sin tocar Firebase.
//     Todo lo anterior queda condicionado exclusivamente al área Tiras de
//     Bobinas — Tubería, Costanera, Lámina y Bodega de Segunda no tienen
//     ni una línea de código modificada.
//
// ── Conteo PT — Service Worker v4.19.0 ─────────────────────────────────────
// Cambios v4.19.0:
//   · Tiras de Bobinas — NUEVO campo "Lote / Nº de serie" en los 5 lugares
//     donde se captura peso (Conteo, MO/Entrada, SRO/Salida, BNC, Despacho):
//     obligatorio, se guarda junto con el peso en cada registro. La unidad
//     de conteo pasa a ser código+lote (no solo código) — dos tiras del
//     mismo código con lote distinto se guardan y agrupan por separado;
//     mismo código+mismo lote sí se unifican/suman en Conteo Parcial, MO,
//     SRO, BNC y Despacho.
//   · Tiras de Bobinas — columna "Atados" ahora se llama "Tira" en la tabla
//     de Conteo y siempre vale 1 por captura (una fila = una tira física),
//     para poder sumar directamente cuántas tiras se contaron por
//     código+lote. Corregido de paso un bug pre-existente en el modo "sin
//     líneas agregadas" (guardado directo) de MO/SRO/BNC: usaban redondeo
//     a entero (evalExp) para el peso en vez de decimales (evalExpDecimal),
//     lo que habría truncado el peso real de la tira.
//   · Tiras de Bobinas — Conteo: nuevo botón 🏷 en Acciones de cada fila
//     para ver el lote de ese registro (toast). El campo Peso (kg) ahora
//     se centra correctamente en pantalla cuando Atados está oculto (antes
//     quedaba encogido a la mitad izquierda por el grid de 2 columnas).
//   · Tiras de Bobinas — NUEVO: escaneo de etiqueta con IA (📷 "Escanear
//     etiqueta con IA"), disponible solo en Conteo → Parcial. Una foto = una
//     tira: se analiza con una Cloud Function dedicada (analizarTiraLamina,
//     separada de analizarTorre) que extrae código, lote y peso de la
//     etiqueta (formato Cóndor u otras), y PRECARGA esos 3 datos en el
//     formulario — nunca agrega el registro automáticamente, siempre queda
//     pendiente de revisión y confirmación manual con "➕ Agregar a la
//     lista". Si algún dato no se pudo leer, avisa cuál falta sin bloquear
//     el resto.
//   · Tiras de Bobinas — NUEVA vista de Resumen: cuando el área activa es
//     Tiras, la pestaña Resumen muestra una tabla propia (Código,
//     Descripción, Lote, Tiras y Peso en Conteo General, Tiras y Peso en
//     Conteo Parcial), agrupando por código+lote — completamente separada
//     del Resumen general (renderResumen), que no fue modificado y sigue
//     funcionando igual para Tubería, Costanera, Lámina y Bodega de
//     Segunda. Aún no incluye comparación contra Odoo (pendiente).
//   · Todo lo anterior queda condicionado exclusivamente al área Tiras de
//     Bobinas — auditado explícitamente que no afecta a ninguna otra área
//     (funciones clave de Resumen, Producto, Odoo, Despacho y BNC
//     comparadas byte a byte contra la versión anterior: sin cambios).
//
// ── Conteo PT — Service Worker v4.18.1 ─────────────────────────────────────
// Cambios v4.18.1:
//   · Pantalla de inicio: el selector de área ahora siempre acomoda 3
//     tarjetas arriba y 2 abajo (centradas), sin importar el ancho de la
//     pantalla. Antes el ancho de cada tarjeta era fijo (100px), lo que en
//     celulares angostos hacía que solo cupieran 2 por fila (2+2+1). Ahora
//     el ancho es proporcional al contenedor.
//
// ── Conteo PT — Service Worker v4.18.0 ─────────────────────────────────────
// Cambios v4.18.0:
//   · NUEVAS ÁREAS: Tiras de Bobinas y Bodega de Segunda, con datos 100%
//     independientes en Firebase (Firestore bajo areas/tiras_bobinas/... y
//     areas/bodega_segunda/...), tarjetas propias en el selector de área
//     (🧲 y 🥈), PINs de acceso propios y sin afectar en absoluto la lógica
//     ni los datos existentes de Tubería, Costanera o Lámina.
//   · Tiras de Bobinas — Tabla PT: "Tipo" fijo en TIRA LAMINA (sin las
//     formas Cuadrado/Rectangular/Redondo, que no aplican). 4 campos nuevos
//     opcionales — Uso/Destino, Grado, Categoría de Peso, Calibre nominal —
//     con sus propios chips de filtro en cascada, que se ocultan solos
//     cuando ningún producto del subconjunto filtrado tiene ese dato.
//     Nuevo ícono 👁️ junto al encabezado "Código" para mostrar/ocultar esas
//     4 columnas extra en la tabla (recuerda la preferencia entre sesiones).
//     Nuevo botón "📥 Cargar base Odoo (Tiras)" que importa los 46 códigos
//     reales extraídos del reporte de Odoo (Quants) — solo agrega los que
//     no existan todavía, protegido con PIN.
//   · Tiras de Bobinas — Conteo/MO/SRO/BNC/Operaciones: el filtro de
//     producto ahora pregunta primero por Espesor y luego por Medida (orden
//     invertido respecto a las demás áreas, donde Medida va primero), ya
//     que así se identifica una tira en la práctica. Etiqueta "Tipo de
//     Tubo" ahora dice "Tipo de Bobina" en esta área.
//   · Tiras de Bobinas — captura de cantidad: el conteo ya NO es por
//     unidades/atados, sino por PESO (kg), ya que así se maneja el
//     inventario real de esta área (igual que en Odoo). El campo "Atados"
//     se oculta, "Unidades Sueltas" pasa a llamarse "Peso (kg)" y admite
//     decimales (hasta 5) sumables con "+" (ej: 12.85400+13.20000), y
//     "Total Unidades" pasa a "Total Peso (KG)". Aplica en los 5 lugares
//     donde se registra cantidad: Conteo, MO, SRO, BNC y Operaciones.
//   · Resumen: corregido que las comparaciones "Exacto/Faltante/Sobrante"
//     usaban igualdad exacta (diff === 0), lo cual con los nuevos valores
//     decimales de Tiras de Bobinas casi nunca daba exactamente cero por
//     ruido normal de coma flotante. Ahora usa una tolerancia de 1 gramo
//     solo en esa área (sin cambio de comportamiento en las demás — la
//     tolerancia es 0 para Tubería/Costanera/Lámina, matemáticamente
//     idéntico a antes). Aplicado en Resumen en vivo, PDF, Excel, Reporte
//     Interactivo, Auditoría, panel de Análisis y Kardex (Movimientos
//     Odoo). El cálculo de "Peso Total" (y por lo tanto el indicador de
//     Capacidad de Bodega) ahora también funciona para Tiras de Bobinas,
//     usando directamente el peso contado en vez de un peso-por-unidad
//     que no aplica a esta área.
//   · NUEVO — Capacidad de Bodega editable manualmente: botón "🏬 Capacidad
//     de bodega" en Tabla PT (protegido con PIN), disponible en las 5
//     áreas por igual. Permite ajustar el total de toneladas de la bodega
//     activa sin tocar código; se guarda por área en Firebase y aplica a
//     todos los perfiles (Inventario, Salida, Transporte).
//

// Cambios v4.17.4:
//   · Operaciones: el ícono de la app (logo círculo naranja "PT") ahora
//     también aparece en la pestaña del navegador en dos lugares más:
//     - El HTML que se comparte por WhatsApp de un despacho/entrada.
//     - La vista previa que se abre antes de imprimir el PDF oficial de un
//       despacho/entrada (generarPDFDespacho); esta última también se
//       corrigió del mismo bug de about:blank que el Reporte Interactivo
//       (window.open('','_blank')+document.write no aplicaba el favicon en
//       varios navegadores; ahora navega directo a una URL de blob real).
//   · Nota: el PDF oficial que se sube a Firebase Storage (_generarHTMLPDFOficial)
//     se renderiza siempre oculto y se convierte a un .pdf binario real — los
//     PDFs no soportan favicon vía HTML, así que no aplica ahí.
//
// ── Conteo PT — Service Worker v4.17.3 ─────────────────────────────────────
// Cambios v4.17.3:
//   · Reporte Interactivo: corregido que el favicon no aparecía al abrirlo
//     en "ventana nueva" desde el botón de la app (sí funcionaba al abrir
//     el archivo descargado). La ventana se abría con window.open('','_blank')
//     + document.write(), lo que deja la URL en about:blank — varios
//     navegadores no aplican el favicon a pestañas sin una navegación real,
//     sin importar que el <link rel="icon"> esté presente. Ahora se genera
//     una URL de blob real y se navega ahí directamente, igual que pasa con
//     el archivo descargado.
//
// ── Conteo PT — Service Worker v4.17.2 ─────────────────────────────────────
// Cambios v4.17.2:
//   · Reporte Interactivo (ventana nueva / HTML descargado): ahora también
//     muestra el logo del cóndor en la pestaña del navegador. Se incrustó
//     el ícono como base64 directamente en el HTML del reporte, ya que este
//     se abre con window.open('', '_blank') o se descarga como archivo
//     independiente — una ruta relativa como "icon-192.png" no funciona en
//     ninguno de esos dos casos porque el reporte no vive junto al resto de
//     archivos de la app.
//
// ── Conteo PT — Service Worker v4.17.1 ─────────────────────────────────────
// Cambios v4.17.1:
//   · Torres: al tomar/subir una foto ahora se corrige automáticamente su
//     orientación según el EXIF antes de guardarla y analizarla con IA —
//     antes, si el celular guardaba la foto "de lado" o "de cabeza" (con
//     rotación indicada solo en el tag EXIF), esa orientación no se aplicaba
//     al enviar la imagen a la IA, y el análisis se hacía igual sobre la
//     imagen sin corregir. Además, NUEVO botón ⟳ en la vista en grande de
//     cada foto para rotarla manualmente 90° si hiciera falta.
//   · Favicon: la pestaña del navegador ahora muestra el logo del cóndor
//     (icon-192.png) en vez del ícono genérico de globo.
//
// ── Conteo PT — Service Worker v4.17.0 ─────────────────────────────────────
// Cambios v4.17.0:
//   · Ficha de Producto: ahora muestra el Código Corto (si el producto lo
//     tiene) justo debajo del código fuente.
//   · Torres: el matching de código ahora reconoce tanto el código largo
//     (Odoo) como el Código Corto al leer las hojas — funciona igual sin
//     importar cuál de los dos se haya escrito a mano. Aplica al match
//     automático por columna de código, al match cuando el código viene
//     mezclado en el texto (hojas viejas) y al buscador manual del
//     resolver de códigos ambiguos/sin match, que ahora también muestra el
//     Código Corto junto al largo en cada tarjeta de candidato. La lectura
//     por IA de la foto (Cloud Function) no se modificó — sigue extrayendo
//     el texto tal cual está escrito; el reconocimiento de cuál formato es
//     ocurre después, del lado del cliente.
//
// Cambios v4.16.0:
//   · NUEVO (solo Lámina) — Código Corto: cada producto de Lámina ahora
//     puede tener un código alterno corto (ej. OG1, TBA3, 2LA7), formado por
//     Tipo + Material abreviados (+ prefijo "2" si es 2DA CALIDAD) más un
//     correlativo único. Pensado para escribirse a mano en las hojas de
//     control de torres en vez del código largo de Odoo, reduciendo error de
//     escritura y de lectura. Se genera automáticamente al crear un producto
//     nuevo (nunca al editar uno existente, para no reasignar un código ya
//     usado en hojas físicas). Nueva columna "Cód. Corto" en Tabla PT
//     (visible solo en Lámina). Nuevo botón "🔤 Generar códigos cortos"
//     (protegido con PIN) para asignárselo de una vez a los productos que
//     ya existían antes de este cambio. Por ahora la IA de Torres sigue
//     leyendo el código largo/descripción sin cambios — la lectura del
//     Código Corto queda para una siguiente entrega.
//
// Cambios v4.15.0:
//   · Mapa (Torres): al eliminar un registro de Conteo Parcial que provenga
//     de una ubicación registrada por foto, ahora se sincroniza también la
//     ubicación en el Mapa — se quita ese código puntual de la posición
//     (o se libera la celda por completo si era el único código ahí). El
//     botón "Borrar Todo" de Conteo Parcial ahora también libera el Mapa
//     completo, ya que ambos datos van de la mano. Antes, borrar el conteo
//     no afectaba el Mapa y las celdas quedaban marcadas como ocupadas
//     aunque ya no hubiera conteo detrás.
//   · Pantalla de inicio (selector de perfil + PIN): ya no aparecen las
//     burbujas del chat de equipo ni los mensajes emergentes (toasts) de
//     operaciones (guardar, eliminar, etc.) mientras se está en esa
//     pantalla, sin haber ingresado todavía a un perfil.
//
// ── Conteo PT — Service Worker v4.14.0 ─────────────────────────────────────
// Cambios v4.14.0:
//   · Chat de equipo: el ícono 💬 del header ahora palpita en amarillo
//     (mismo efecto visual que el marciano 👽) cuando hay mensajes sin leer,
//     además del badge numérico rojo que ya existía. Deja de palpitar
//     automáticamente en cuanto se abre el chat.
//
// Cambios v4.13.0:
//   · Tabla PT: los botones "Normalizar espesores" y "Normalizar medidas"
//     ahora también corrigen formato dentro de Entradas/Salidas (colección
//     despachos, campo dentro del arreglo items) — antes solo tocaban
//     Tabla PT, Registros, MOs y SROs, dejando fuera los despachos.
//   · Tabla PT: NUEVO botón "🎯 Corregir valor por código" (protegido con
//     PIN), con modal propio (mismo diseño que el resto de la app, ya no
//     usa los prompt() nativos del navegador). Permite corregir un valor
//     incorrecto de fondo (ej. espesor guardado como texto "mediano" en vez
//     de un número) ya propagado a Tabla PT, Registros, MOs, SROs y
//     Entradas/Salidas para un código específico — muestra un preview con
//     cuántos registros se van a tocar por colección antes de aplicar.
//   · Conteo: NUEVO candado con PIN 2907 para entrar al modo "General"
//     (Conteo Parcial sigue libre). La app ahora arranca en modo Parcial
//     por defecto; al intentar cambiar a General pide el PIN, y el
//     desbloqueo se resetea automáticamente en cuanto se vuelve a Parcial
//     (hay que reingresar el PIN cada vez que se quiera volver a General).
//   · Chat de equipo: NUEVO — burbuja flotante en la esquina superior
//     derecha cuando llega un mensaje nuevo y el chat no está abierto,
//     para leerlo sin necesidad de entrar. Apila hasta 3 burbujas a la vez
//     (si llega una 4ta, se retira la más antigua), cada una con su propio
//     color fijo por persona (7 colores posibles, asignados de forma
//     consistente según quién escribe) y temporizador independiente de 8s.
//     Tocar una burbuja abre el chat completo; también se puede cerrar con
//     su ✖ individual. Reemplaza el toast genérico anterior (que solo
//     mostraba 40 caracteres y no era tocable).
//   · Operaciones: al copiar la descripción de un despacho/entrada, ahora
//     se agrega una línea nueva "🔢 N° Operación" con solo el número de
//     operación (sin prefijo ni tipo), extraído automáticamente sin
//     importar si es SRO, MO, SO-CEN, SO-BSM, Traslado BSM o Entrada.
//
// Cambios v4.12.0:
//   · Capacidad de Bodega (Toneladas) ahora es independiente por área:
//     Tubería 1542 ton, Costanera 570 ton, Lámina 1472.75 ton (antes las 3
//     áreas usaban el mismo valor fijo de Tubería). Afecta el KPI de
//     Resumen, el Dashboard general y el Reporte Interactivo standalone.
//     La capacidad en atados (Dashboard/PDF) se mantiene en 2450 para las
//     3 áreas por ahora, pendiente de ese dato desglosado.
//   · El botón "🔍 Auditoría" (con su mismo PIN de acceso) ahora genera y
//     descarga directamente un Excel de "Justificación de Diferencias",
//     con TODOS los códigos de Resumen (Producto, Ubicación, Categoría,
//     Teórico, Físico, Faltante, Sobrante, Unidades Justificadas y
//     Justificación). La Justificación se arma automáticamente combinando
//     👽 Movimientos Pendientes (MO/SRO/SO/AJUSTE con su número de
//     referencia) y 📌 Seguimiento; si un código no tiene nada de eso,
//     la celda queda en blanco. El modal antiguo de Auditoría ya no es
//     accesible desde la interfaz.
//
// Cambios v4.11.0:
//   · NUEVO — Selector de ambigüedad de producto: en Tubería, Mo, Bnc,
//     Costanera (Sro), D y el modal "Agregar item a registro", cuando la
//     combinación de filtros (Calidad+Material+Tipo+Medida+Espesor[+Pies])
//     coincide con más de un producto (ej. mismo producto en 6m y 6.50m),
//     ya no se toma automáticamente el primero — se muestra una tarjeta por
//     cada opción (código + descripción + color) para elegir manualmente
//     cuál es. Si solo hay 1 resultado, sigue resolviendo automático como
//     antes.
//   · Tabla PT: cada código ahora admite 2 fotos (antes solo 1). El modal
//     de foto del producto muestra 2 slots fijos (Foto 1 / Foto 2), cada
//     uno con botones independientes 📷 Tomar foto (cámara directa) y
//     🖼 Galería, más 🗑 Eliminar. Nuevo campo fotoUrl2 en Firestore junto
//     al fotoUrl existente (las fotos ya cargadas se conservan en el
//     slot 1 sin migración).
//   · Operaciones → Despacho: el auto-adjuntado de foto(s) de Tabla PT al
//     agregar un código con foto ahora adjunta AMBAS fotos si el producto
//     tiene las 2 cargadas (antes solo adjuntaba la primera). Corregido el
//     criterio de anti-duplicado para que ya no bloquee la segunda foto
//     del mismo código.
//
// Cambios v4.10.0:
//   · Reporte Interactivo (Resumen): la columna 👽 Movs. ahora se oculta
//     automáticamente en la vista Físico vs Papelería (solo aplica a Físico
//     vs Sistema) y se ajusta al cambiar de vista con el botón "🔁 Vista"
//     sin necesidad de regenerar el reporte.
//   · Reporte Interactivo: el modal de movimientos de cada marciano ahora
//     tiene el mismo estilo visual (tamaños, colores, proporciones) que el
//     modal original de la pestaña Resumen. Se ensanchó el modal para evitar
//     la barra de desplazamiento horizontal.
//   · Reporte Interactivo: el botón de comentario 💬 de cada movimiento
//     ahora sí abre un modal de solo lectura con el comentario completo
//     (antes no reaccionaba al clic). Corregido z-index para que ese modal
//     no quede oculto detrás del modal de movimientos, y eliminado el doble
//     scroll vertical al abrirlo.
//   · Normalizar espesores / Normalizar medidas (Tabla PT): ambos botones
//     ahora piden PIN antes de ejecutar la migración en Firestore.
//   · Tecla ESC: corregido en toda la app y en el Reporte Interactivo para
//     que cierre un modal a la vez (el que esté más "encima"), en vez de
//     cerrar varios modales anidados con una sola pulsación. Incluye el
//     comentario de Movimientos Odoo, el comentario de Auditoría y la
//     edición inline de montos.
//   · Resumen → Modal Movimientos Odoo (👽): NUEVO — botón 📋 "Copiar fila"
//     en cada movimiento (junto a 💬 y 🗑), que copia toda la info de esa
//     fila en un formato de texto listo para pegar. Nueva pestaña
//     "📌 Seguimiento" para pegar esas filas copiadas y guardarlas en
//     Firestore (colección seguimientosMov), ligadas a Fecha + Referencia
//     del movimiento — con lista de seguimientos guardados y botón de
//     eliminar (protegido con PIN). Las filas con seguimiento pendiente se
//     resaltan en amarillo (igual que con comentario) e incluyen un ícono
//     📌 junto a la referencia, incluso si el movimiento se borra y se
//     vuelve a cargar actualizado (el vínculo persiste por Fecha+Referencia).
//   · Movimientos Odoo importados desde "Agregar" (pegado desde Excel/Odoo):
//     ahora entran con estado "✅ Completada" por defecto en vez de "Sin
//     estado", listos para ajustar manualmente tras el análisis visual.
//   · Corregido: los mensajes emergentes (toasts) de toda la app quedaban
//     ocultos detrás de los modales abiertos por tener menor z-index.
//
// Cambios v4.9.0:
//   · Resumen: nuevo botón "📥 Reporte Excel" junto a "Generar Reporte",
//     con 5 hojas (Resumen/KPIs, Totales por Tipo, Faltantes, Sobrantes,
//     Detalle) que respetan la vista activa (Físico vs Papelería / Físico
//     vs Sistema), incluyendo columna de Conteo Parcial y, en Detalle, la
//     desviación (Físico−Odoo Ajustado en vista Sistema, Físico−Parcial en
//     vista Papelería).
//   · Vista Físico vs Papelería: corregida la clasificación Exacto/
//     Faltante/Sobrante (badge, bandas agrupadoras y KPIs de Resumen,
//     además de reporte PDF, Excel y Reporte Interactivo) para que se lea
//     de forma intuitiva — Físico mayor al Parcial contado se marca como
//     Faltante, y Parcial mayor al Físico como Sobrante. La vista Físico
//     vs Sistema no se modificó (ya era correcta). Corregido efecto
//     colateral en las sumas de unidades Sobrantes (Resumen y Reporte
//     Interactivo), que podían mostrar signos inconsistentes tras el
//     cambio de clasificación.
//   · Resumen: el ícono 👽 (Movimientos Odoo) de cada fila ahora se resalta
//     en amarillo con animación de pulso cuando ese código tiene entradas
//     o salidas pendientes de operar en Odoo (columna de Ajuste ▲/▼); el
//     estado rojo (saldo no coincide con el Físico) también pulsa ahora.
//   · Nombres de archivo descargados (reportes, exportaciones, etc.):
//     corregido para usar la hora local del dispositivo en vez de UTC —
//     antes podían mostrar una fecha/hora adelantada varias horas.
//
// Cambios v4.8.0:
//   · NUEVO — Resumen: pestaña "🔍 Auditoría" (protegida con código de
//     acceso), en una vista aparte con tabla de Código, Descripción,
//     Físico, Odoo (dato crudo), Entradas Pendientes y Salidas Pendientes
//     (movimientos marcados como "⏳ Pendiente" en el marcianito, separados
//     por tipo, con referencia + cantidad + fecha) y Estado (Odoo − Físico:
//     Exacto / Faltante / Sobrante, solo con ícono).
//   · Auditoría: comentario independiente por cada entrada/salida
//     pendiente (no se mezcla con el comentario general de Movimientos
//     Odoo), editable desde un ícono 💬 alineado a la derecha de cada
//     línea. Ícono del marciano por código, en columna propia al final de
//     la tabla, que abre el modal de movimientos existente por encima de
//     Auditoría (antes quedaba detrás).
//   · Auditoría: 3 reportes exportables — PDF agrupado por Tipo, Excel con
//     columna Tipo y autofiltro, y Reporte Interactivo con selector de
//     agrupación (Tipo/Material/Medida/Espesor/Estado/Sin agrupar), opción
//     de ver en pestaña nueva o descargar HTML para compartir (igual que
//     el otro reporte interactivo), modo día/noche, e ícono del marciano
//     con movimientos completos embebidos — todo queda congelado al
//     momento de generarse, sin conexión en vivo a Firebase.
//   · Lámina: columna "Pies" agregada a los reportes que la tenían
//     incompleta (PDF dashboard, Reporte Interactivo, MO/SRO) y
//     correctamente oculta en Tubería y Costanera, donde no aplica.
//     Textos "Tubo" corregidos a "Lámina" en los títulos de esos mismos
//     reportes cuando el área activa es Lámina.
//   · Mapa (Torres): el modal de detalle de una ubicación ahora se
//     muestra más ancho y en una sola línea por código, sin cortarse en
//     dos renglones.
//   · Corregido bug de todo el sistema: los campos de texto en mayúsculas
//     (comentarios, nombres, referencias, etc.) reposicionaban el cursor
//     al final cada vez que se escribía, incluso editando en medio de un
//     texto ya existente. Corregido en 34 campos.
//
// Cambios v4.7.0:
//   · Torres: soporte para hoja con columna CODIGO separada de la
//     descripción (formato "[MATERIAL]-[TIPO]-[ESPESOR]-[PIES]") y 4
//     columnas de conteo (antes 7). El matching ahora prioriza el código
//     exacto de esa columna antes de intentar por descripción.
//   · Torres: ahora se pueden analizar de 1 a 3 fotos de la misma
//     ubicación en una sola captura (para torres que no caben en una sola
//     hoja). Se valida que todas las fotos coincidan en Área y Línea antes
//     de continuar, y los códigos repetidos entre fotos se suman
//     automáticamente en una sola línea.
//   · Torres: la foto seleccionada ahora se muestra en grande en un panel
//     dedicado (clic en cualquier miniatura para verla), con overlay de
//     carga de pantalla completa mientras la IA analiza. Al terminar, las
//     fotos se ocultan y la revisión de datos ocupa todo el ancho.
//   · Torres: al guardar una ubicación, además de actualizar el Mapa, los
//     códigos se guardan también como registros individuales en Conteo
//     Parcial (con Área y Línea), reemplazando por completo los registros
//     anteriores de esa misma ubicación (sin duplicados).
//   · Mapa: filtros en cascada reales (Calidad, Material, Tipo, Medida,
//     Pies, Espesor, mismo componente visual que Tabla PT) para resaltar
//     posiciones, además del buscador de texto. Vista a pantalla completa
//     y grid más grande y visual, con animación en las posiciones
//     resaltadas.
//   · Corregidos 3 bugs: comparación de Área/Línea entre fotos que podía
//     dar falso "ubicación distinta" por diferencia de tipo de dato;
//     códigos duplicados al resolver manualmente dos líneas al mismo
//     producto (ahora se combinan); índice de miniatura incorrecto al
//     quitar una foto anterior a la seleccionada.
//
// Cambios v4.6.0:
//   · NUEVO MÓDULO (solo área Lámina): pestañas "📸 Torres" y "🗺 Mapa".
//     Torres permite tomar/subir foto de la hoja de control física de una
//     torre de lámina; una Cloud Function propia analiza la foto con IA y
//     extrae Área, Línea y los códigos con su última columna de conteo con
//     dato. El texto leído se compara contra la BD (código exacto →
//     descripción por similitud → asignación manual con buscador si no hay
//     match), y todo pasa por una pantalla de revisión editable antes de
//     guardarse. Al guardar, la ubicación (Área+Línea) se sobreescribe por
//     completo — nunca coexisten dos registros en la misma posición.
//   · Mapa: grid interactivo 15x6 por Área 1 y Área 2, con buscador de
//     código que resalta las posiciones donde aparece, y detalle de cada
//     celda al tocarla.
//
// Cambios v4.5.0:
//   · Cuadre BNC: corregido bug donde al editar BNC Conteo o BNC Odoo se
//     sobrescribía la descripción del producto con el texto interno del
//     registro de ajuste ("AJUSTE MANUAL (Cuadre BNC)"). Ahora la
//     descripción siempre se toma del catálogo de productos (Tabla PT).
//   · Cuadre BNC: se agregaron 2 columnas nuevas, editables igual que las
//     demás — "BNC Control de Calidad" y "Clasificación" — y se
//     renombraron "Odoo" → "BNC Odoo" y "BNC" → "BNC Conteo". Orden final:
//     BNC Conteo, BNC Odoo, BNC Control de Calidad, Clasificación,
//     Diferencia, Estado.
//   · Cuadre BNC: la Diferencia ahora se calcula como BNC Conteo − (BNC
//     Odoo + BNC Control de Calidad + Clasificación), y se muestra siempre
//     aunque no haya dato de Odoo cargado (antes mostraba "Sin dato en
//     Odoo" y no calculaba). Solo quedan 3 estados posibles: ✅ Exacto,
//     🟡 Sobrante, 🔴 Faltante — mostrados solo con ícono (el detalle
//     completo, ej. "Faltante 45", aparece al mantener presionado/con el
//     cursor encima).
//   · Cuadre BNC: el botón "✕" para eliminar fila ahora aparece en todos
//     los registros (antes solo en los que tenían dato de Odoo cargado).
//     Borra los valores de BNC Odoo, BNC Control de Calidad y
//     Clasificación de esa fila, protegido con PIN.
//   · Cuadre BNC y Registros BNC: rediseño visual de ambas tablas para que
//     quepan en pantalla sin necesidad de la barra de scroll horizontal —
//     columnas de ancho fijo, encabezados centrados y compactos (sin
//     cortar palabras a la mitad), código de producto en una sola línea,
//     y números más grandes y legibles en las columnas editables.
//
// Cambios v4.4.0:
//   · Cuadre BNC: los números de las columnas Odoo y BNC ahora son
//     editables — clic sobre el número lo selecciona, se escribe el nuevo
//     valor y se guarda automáticamente. Editar Odoo actualiza la
//     Existencia Odoo (BNC) directo; editar BNC agrega un registro de
//     ajuste con la diferencia exacta, sin borrar el historial de conteos.
//   · Corregido: en BNC, la etiqueta "UNIDADES SUELTAS" se partía en dos
//     líneas con la letra más grande y desalineaba el cuadro de Sueltas
//     respecto al de Atados.
//   · BNC ahora también está disponible en la barra de navegación inferior
//     móvil (antes solo aparecía en escritorio/tablet), para que los
//     Verificadores de Inventario puedan contar BNC desde el celular.
//   · Header en vista móvil: ahora solo se muestran los íconos de cambiar
//     tema (día/noche), chat del equipo, estado de conexión y usuarios
//     conectados. Se ocultaron el badge de área activa, cerrar perfil,
//     bitácora y almacenamiento Firebase (siguen disponibles en
//     escritorio/tablet).
//
// Cambios v4.3.3:
//   · Cuadre BNC: nuevo botón "🗑 Borrar Todo" y botón "✕" por fila para
//     eliminar códigos individuales de la Existencia Odoo (BNC), ambos
//     protegidos con código de seguridad (mismo modal de PIN que el resto
//     de la app).
//   · Cuadre BNC: se quitó el texto descriptivo largo, dejando solo la
//     fecha/hora de la última carga.
//   · BNC: letra más grande y legible en todo el módulo (tablas,
//     etiquetas de filtros, tarjeta de producto, botones de calidad y
//     lista de productos agregados).
//
// Cambios v4.3.2:
//   · Cuadre BNC: la tabla ahora muestra TODOS los códigos involucrados,
//     no solo los que ya tienen conteo capturado. Incluye tanto los
//     códigos cargados desde el Excel de Odoo (BNC) aunque aún no se hayan
//     contado (BNC = 0), como los ingresados manualmente desde el modal de
//     filtros en cascada aunque no tengan dato de Odoo.
//
// Cambios v4.3.1:
//   · Cuadre BNC: nuevo botón "📤 Cargar Excel Odoo (BNC)" para subir la
//     Existencia Odoo propia de esa bodega (formato "[código] descripción"
//     + cantidad, igual que el Excel de Quants). Es un dato 100%
//     independiente de la pestaña Odoo general — antes el Cuadre BNC
//     comparaba contra el Odoo general y por eso la mayoría de códigos
//     salían "Sin dato en Odoo". Soporta cantidades decimales y suma
//     automáticamente filas repetidas del mismo código.
//
// Cambios v4.3.0:
//   · NUEVA PESTAÑA: BNC (Bodega No Conforme). Captura independiente de
//     productos 1RA/2DA que pasan a esa bodega para revisión, con su
//     propia colección en Firestore (registrosBNC) — no toca ni se ve
//     afectada por Conteo General, Conteo Parcial, Resumen ni Dashboard.
//     Incluye código rápido, filtros en cascada (Material/Tipo/Medida/
//     Pies/Espesor), lista de productos agregados, guardado con overlay
//     de carga, tabla de registros con eliminación individual y "Borrar
//     Todo" protegido con PIN.
//   · Cuadre BNC independiente: nueva tabla que compara Existencia Odoo
//     vs. lo contado en BNC (agrupado por código + calidad), con el mismo
//     criterio visual Exacto/Faltante/Sobrante que el Resumen general,
//     pero calculado por separado sin mezclar datos.
//   · Acceso restringido: la pestaña BNC solo es visible para el perfil
//     Verificador de Inventario, y no aparece en la barra de navegación
//     móvil (solo disponible en escritorio/tablet).
//
// Cambios v4.2.0:
//   · Conteo → Código rápido: ahora disponible también en modo General
//     (antes solo existía en Parcial). Busca el código y llena
//     automáticamente Calidad/Material/Tipo/Medida/Pies/Espesor.
//   · Conteo → botón "➕ Agregar a la lista" y la lista "Productos
//     agregados": ahora disponibles en ambos modos (General y Parcial).
//     "💾 Guardar Conteo" guarda todas las líneas de la lista de una vez
//     en la colección correcta (registros o registrosParcial) según el
//     modo activo. Al cambiar de modo con productos pendientes en la
//     lista, esta se limpia para evitar guardarlos en la colección
//     equivocada.
//   · Conteo → Cargar Excel de Quants (Odoo): nuevo botón junto al código
//     rápido, disponible en General y Parcial, en las 3 áreas. Lee cada
//     fila "[código] descripción" + cantidad, busca el código en la BD y
//     agrega los encontrados a la lista con Sueltas = cantidad. Al
//     terminar muestra un resumen con la lista exacta de códigos no
//     encontrados para agregarlos manualmente.
//   · Conteo Parcial: la tarjeta que aparece al seleccionar un producto ya
//     no compara contra Odoo. Ahora compara Físico (Conteo General +
//     todas las entradas − todas las salidas) vs. Parcial acumulado para
//     el código y calidad seleccionados, para validar si el Conteo
//     Parcial ya cuadra con el Físico. Esa comparación contra Odoo se
//     eliminó del modo General.
//   · Overlay de carga de pantalla completa (spinner + mensaje) agregado
//     a todas las operaciones que implican espera: Guardar Entrada,
//     Guardar Salida/SRO, Guardar/Actualizar Despacho o Recepción,
//     Compartir Despacho y Transporte por WhatsApp, Guardar/Actualizar
//     evidencia de Transporte, Generar PDF de Transporte, Normalizar
//     espesores/medidas, Generar reporte, Cargar Excel de Quants en
//     Conteo, Guardar Conteo (lista) y Borrar Todo en Conteo.
//   · Corregido: el botón "↺ Limpiar" del Conteo no borraba el campo de
//     Código rápido en modo General cuando no había productos en la lista.
//   · Corregido: la etiqueta "Tipo de Tubo" (Conteo, Entrada/MO, Salida/
//     SRO) ahora se ajusta según el área activa — "Tipo de Costanera" en
//     Costanera y "Tipo de Lámina" en Lámina — en vez de mostrar siempre
//     "Tipo de Tubo".
//
// Cambios v4.1.0:
//   · NUEVA ÁREA: Lámina. Se agrega como tercera área junto a Tubería y
//     Costanera, con datos 100% independientes en Firebase (Firestore bajo
//     areas/lamina/... y Storage bajo fotos_pt/lamina/...), PIN propios de
//     acceso, y sin afectar en absoluto la lógica ni los datos existentes
//     de Tubería/Costanera.
//   · Catálogo de Lámina: se cargaron y clasificaron los 225 códigos reales
//     del área, con sus Tipos correctos: Ondulada, Troquelada, Troquelada
//     Blanca, Troquelada Roja, Lisa, Lisa Blanca, Lisa Roja, Lisa Fría y
//     Lisa Suave (antes mezclados incorrectamente como color en vez de
//     subtipo). Validado matemáticamente: los 225 códigos se identifican de
//     forma única con Calidad + Material + Tipo + Medida + Pies + Espesor.
//   · Tabla PT: nuevo campo "Pies" (largo), independiente del campo
//     "Medida" (ancho, que ahora solo aplica a la familia Lisa). Tipo,
//     Material y Color del formulario "Nuevo/Editar Producto" ahora se
//     arman dinámicamente según el área activa. Auto-detección de Tipo/
//     Material/Color/Espesor/Medida/Pies al escribir el Código o la
//     Descripción de un producto de Lámina. Nueva columna "Pies" y su chip
//     de filtro en la tabla (ordenados numéricamente, no alfabéticamente),
//     visibles solo en el área Lámina.
//   · Registro de Conteo, Entrada (MO), Salida (SRO), Operaciones/Despacho
//     y Registro Agregar: se adaptaron los 5 formularios de filtros en
//     cascada (Material → Tipo → Medida → Pies → Espesor) para reconocer
//     los tipos y materiales de Lámina. Se corrigió un bug de fondo que
//     bloqueaba el paso a Espesor cuando "Medida" no aplicaba al tipo
//     (Ondulada/Troquelada no usan Medida); ahora ese campo se oculta
//     automáticamente cuando no hay datos, en vez de quedar trabado.
//     Tubería y Costanera conservan exactamente el mismo comportamiento
//     de antes — todo el cambio queda condicionado al área activa.
//   · Resumen: se agregó columna y chip de filtro "Pies". Se corrigió un
//     bug donde el panel de filtros exigía que "Medida" tuviera valor para
//     que un Tipo/Material apareciera como opción filtrable (excluía a la
//     mayoría de los códigos de Lámina). Se corrigió un desalineamiento de
//     columnas en la tabla en pantalla y en el reporte PDF (la fila de
//     datos no tenía celda para "Pies" aunque el encabezado sí).
//   · Chips de filtro (Tabla PT, Resumen, Odoo): los chips de Material
//     ahora muestran un punto de color (celeste = Aluzinc, plateado =
//     Galvanizado) para identificarlos de un vistazo.
//   · Corregido: el color de Aluzinc en los botones de Material de Entrada/
//     Salida/Operaciones/Registro Agregar no se aplicaba (y por eso
//     tampoco se quitaba al usar "Limpiar filtros") por una clase CSS que
//     faltaba remover en el sistema compartido de esas 4 pantallas.
//   · Exportaciones (Excel, CSV y PDF) de Tabla PT, Registros de Conteo,
//     reportes de Entradas/Salidas y ficha de producto: se agregó el dato
//     de "Pies" donde correspondía, y se corrigieron rangos de auto-filtro
//     de Excel que habían quedado desactualizados.
//   · Perfil Transporte: ahora es exclusivo del área Tubería (oculto y
//     bloqueado por completo en Costanera y Lámina), sin borrar su código
//     ni afectar su funcionamiento donde sí debe existir.
//   · Nuevo botón "🚪 Cerrar perfil" en el header: cierra la sesión activa
//     y regresa a la pantalla de selección de área/perfil, con una
//     transición de pantalla sin parpadeo (mismo overlay que ya se usaba
//     al cambiar de área).
//   · Todos los diálogos de confirmación nativos del navegador (confirm())
//     y alertas nativas (alert()) fueron reemplazados por componentes con
//     el estilo propio de la app.
//
// Cambios v4.0.9:
//   · Tabla PT: se eliminó el listener de "siembra automática" de productos
//     por defecto (BD_DEFAULT / BD_DEFAULT_COSTANERA) que podía sobrescribir
//     por completo un producto (borrando su pesoKg y fotoUrl) si el listener
//     de Firestore recibía un snapshot vacío transitorio. Ahora el peso se
//     carga siempre de forma manual, así que ya no hay siembra automática.
//   · Tabla PT: se quitó el botón "⚖️ Cargar pesos iniciales" y toda su
//     función asociada (ya no se usa; el peso de cada producto se ingresa
//     manualmente uno por uno).
//   · Entrada (MO) y Salida (SRO): se eliminaron los botones "📂 Importar
//     Entrada" y "📂 Importar SRO" (carga masiva desde archivo), junto con
//     sus modales de revisión y todo el código de importación asociado, ya
//     que no se van a usar.
//   · Página SRO: el título "Nueva Salida (SRO)" ahora dice simplemente
//     "Nueva Salida".
//
// Cambios v4.0.8:
//   · Resumen → Modal Movimientos Odoo: nuevo botón "📦 Stock Odoo" a la
//     izquierda de "Entradas". Cierra el modal, navega a la pestaña Odoo y
//     filtra automáticamente por el código del producto.
//   · Pestaña Odoo: el botón ✏ de editar existencia ya no usa el prompt()
//     nativo del navegador. Ahora abre un modal con el mismo diseño del
//     Conteo PT, que permite sumar/restar sobre la existencia actual
//     (ej: 13100+50) con botones +/− y resultado calculado en vivo antes
//     de confirmar.
//
// Cambios v4.0.7:
//   · Tabla PT: nuevo botón de foto por código. Rojo = sin foto, Verde = con
//     foto. Sin foto abre galería directo; con foto abre modal para verla en
//     grande, cambiarla o eliminarla. Fotos guardadas en Firebase Storage
//     bajo fotos_pt/{id}/foto.{ext}. Campo fotoUrl guardado en Firestore.
//   · Operaciones → Despachos/Entradas: al agregar un código PT que tenga
//     foto adjunta, esta se adjunta automáticamente a la sección de Carga.
//     Orden de fotos: papelería manual → carga manual → carga auto PT.
//     Las fotos automáticas se distinguen visualmente con borde naranja y
//     el código PT en la miniatura.
//   · PDF y HTML de despachos/entradas: soporte para fotos automáticas con
//     fotoUrl (URL de Storage) además de las manuales con data (base64).
//     Conversión via XHR a base64 antes de dibujar en canvas para evitar
//     errores CORS. Orden correcto aplicado en todos los generadores:
//     _generarHTMLPDFOficial, generarPDFDespacho, HTML viewer y PDF de
//     registro de movimiento.
//   · Firebase Storage CORS configurado en el bucket para permitir que el
//     navegador descargue imágenes para incrustarlas en PDFs.
//
// Cambios v4.0.6:
//   · Header: nuevo botón 🗄️ de uso de almacenamiento Firebase, protegido
//     con código de acceso. Muestra desglose por área (Tubería / Costanera)
//     con conteo de documentos, peso estimado por colección y barras de
//     progreso con indicadores de color (verde / amarillo / rojo).
//   · Transición de área sin parpadeo: al cambiar entre Tubería y Costanera
//     se activa un overlay de carga inmediato que cubre el reload de página,
//     eliminando el parpadeo visual durante la transición.
//
// Cambios v4.0.5:
//   · Operaciones → Registrar movimiento: flujo seguro con PDF oficial.
//     Al confirmar el registro se genera automáticamente un PDF con todos
//     los datos del despacho/entrada (incluyendo fotos), se sube a Firebase
//     Storage (pdfs/{area}/{entradas|salidas}/{id}.pdf) y la URL queda
//     guardada en cada documento de Firestore. Solo si todo lo anterior
//     tiene éxito se elimina el registro de Operaciones. Si algo falla,
//     no se pierde ningún dato.
//   · Entradas / Salidas: ícono PDF personalizado visible en cada grupo
//     que tenga PDF oficial. Al hacer clic abre un modal visor con iframe
//     y botón de descarga. Registros anteriores sin PDF no muestran ícono.
//   · PDF oficial: incluye sello con usuario que registró, fecha/hora
//     exacta y referencia del movimiento. Generado con jsPDF + html2canvas
//     (renderizado en iframe oculto para evitar temblor visual).
//   · Overlay de carga durante el registro: cubre la pantalla con spinner
//     y mensajes de progreso por paso (Preparando → Generando PDF →
//     Convirtiendo → Subiendo → Registrando), evitando interacción
//     accidental mientras el proceso está en curso.
//   · Modales: agregado overscroll-behavior:contain en .modal-overlay para
//     evitar que el scroll del modal se propague a la pantalla principal
//     (scroll chaining). Aplica a todos los modales de la app.
//   · Resumen → Modal Movimientos Odoo: filas de la tabla ahora son
//     seleccionables con un clic. La fila seleccionada se mantiene
//     resaltada en naranja hasta que se seleccione otra o se haga clic
//     en la misma fila para deseleccionar.
//   · Firebase Storage habilitado: se agrega el SDK firebase-storage-compat
//     v9.23.0, html2canvas v1.4.1 y jsPDF v2.5.1 como dependencias externas.

const CACHE_NAME = 'conteo-pt-v4.80.0';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './img8.png',   // Logo Cóndor — pantalla de login
  './img9.png',   // Logo Cóndor — header de la app / reportes PDF
];

// ── Instalación ──────────────────────────────────────────────────────────────
// Cachea cada asset por separado en vez de cache.addAll(): así, si un archivo
// puntual no responde 200 (p. ej. icon-192.png o manifest.json aún no
// desplegados en Glitch), no se cae la instalación completa del SW.
//
// IMPORTANTE: ya NO se llama self.skipWaiting() aquí automáticamente. La
// nueva versión se instala y queda "esperando" (estado waiting) sin tomar
// el control todavía — así index.html puede detectarla y mostrar el aviso
// obligatorio de actualización. Solo se activa cuando el usuario confirma
// (ver listener 'message' más abajo).
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset =>
          cache.add(asset).catch(() => {
            // Silencioso: ese asset puntual no se pudo precachear, pero el
            // resto de la instalación continúa con normalidad.
          })
        )
      )
    )
  );
});

// ── Mensaje desde la página: el usuario confirmó "Actualizar ahora" ───────────
// index.html envía { type: 'SKIP_WAITING' } al worker en estado waiting; recién
// ahí esta versión toma el control (clients.claim() en 'activate').
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ── Activación: eliminar caches anteriores ────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: Network-first para index.html, stale-while-revalidate para
//    imágenes (img*.png/jpeg — se reemplazan de vez en cuando con el mismo
//    nombre de archivo, así que no pueden quedar en caché para siempre),
//    cache-first para el resto (JS/CSS de librerías externas, manifest,
//    etc. — esos si cambian, cambian de versión/nombre) ───────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) return;

  if (url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(cached =>
            cached || caches.match('./index.html')
          )
        )
    );
    return;
  }

  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchAndUpdate = fetch(event.request).then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached); // sin red: se queda con lo que ya había en caché (o nada)
        // Responde YA con lo cacheado si existe (rápido, funciona offline);
        // si no hay nada en caché todavía, espera la respuesta de red.
        return cached || fetchAndUpdate;
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
