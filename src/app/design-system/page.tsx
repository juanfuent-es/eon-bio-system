import { Button, SoftButton, PlainButton } from '@/components/elements/button'
import { Input } from '@/components/elements/input'
import { Textarea } from '@/components/elements/textarea'
import { Select } from '@/components/elements/select'
import { Checkbox } from '@/components/elements/checkbox'
import { Radio } from '@/components/elements/radio'
import { FormGroup } from '@/components/elements/form-group'
import { Label } from '@/components/elements/label'

export default function DesignSystemPage() {
    return (
        <div className="bg-bone-50 text-obsidian-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-24">

                <header className="space-y-4">
                    <h1 className="text-4xl font-bold">EON BioSystem Design System</h1>
                    <p className="text-mineral-600 text-lg">
                        Tokens, componentes y estilos unificados para el sistema visual de EON.
                    </p>
                </header>

                {/* COLORES */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-mineral-200 pb-2">1. Colores</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Obsidian Black</h3>
                            <p className="text-sm text-mineral-600">Lectura Clínica: Precisión & profundidad</p>
                            <div className="flex flex-col gap-1">
                                <div className="bg-obsidian-950 text-white p-3 rounded text-sm text-center">950</div>
                                <div className="bg-obsidian-900 text-white p-3 rounded text-sm text-center">900</div>
                                <div className="bg-obsidian-700 text-white p-3 rounded text-sm text-center">700</div>
                                <div className="bg-obsidian-500 text-white p-3 rounded text-sm text-center">500</div>
                                <div className="bg-obsidian-300 text-obsidian-950 p-3 rounded text-sm text-center border border-mineral-200">300</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Vital Amber</h3>
                            <p className="text-sm text-mineral-600">Energía & activación</p>
                            <div className="flex flex-col gap-1">
                                <div className="bg-vital-950 text-white p-3 rounded text-sm text-center">950</div>
                                <div className="bg-vital-900 text-white p-3 rounded text-sm text-center">900</div>
                                <div className="bg-vital-700 text-white p-3 rounded text-sm text-center">700</div>
                                <div className="bg-vital-500 text-white p-3 rounded text-sm text-center">500</div>
                                <div className="bg-vital-300 text-vital-950 p-3 rounded text-sm text-center border border-mineral-200">300</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Renewal Green</h3>
                            <p className="text-sm text-mineral-600">Equilibrio & regeneración</p>
                            <div className="flex flex-col gap-1">
                                <div className="bg-renewal-950 text-white p-3 rounded text-sm text-center">950</div>
                                <div className="bg-renewal-900 text-white p-3 rounded text-sm text-center">900</div>
                                <div className="bg-renewal-700 text-white p-3 rounded text-sm text-center">700</div>
                                <div className="bg-renewal-500 text-white p-3 rounded text-sm text-center">500</div>
                                <div className="bg-renewal-300 text-renewal-950 p-3 rounded text-sm text-center border border-mineral-200">300</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Bone / Mineral</h3>
                            <p className="text-sm text-mineral-600">Neutralidad & Soporte</p>
                            <div className="flex flex-col gap-1">
                                <div className="bg-bone-50 text-obsidian-900 p-3 rounded text-sm text-center outline outline-1 outline-mineral-200 shadow-sm">Bone 50</div>
                                <div className="bg-bone-100 text-obsidian-900 p-3 rounded text-sm text-center outline outline-1 outline-mineral-200 shadow-sm">Bone 100</div>
                                <div className="bg-mineral-200 text-obsidian-900 p-3 rounded text-sm text-center">Mineral 200</div>
                                <div className="bg-mineral-500 text-white p-3 rounded text-sm text-center">Mineral 500</div>
                                <div className="bg-mineral-900 text-white p-3 rounded text-sm text-center">Mineral 900</div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* BOTONES */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-mineral-200 pb-2">2. Botones & Llamados a la Acción</h2>
                    <div className="flex flex-wrap gap-8 items-start">

                        <div className="space-y-4">
                            <h3 className="font-semibold text-mineral-600">Primary (Button)</h3>
                            <div className="flex gap-4">
                                <Button size="md">Continuar</Button>
                                <Button size="lg">Guardar Cambios</Button>
                                <Button size="md" disabled className="opacity-50 cursor-not-allowed">Desactivado</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-mineral-600">SoftButton</h3>
                            <div className="flex gap-4">
                                <SoftButton size="md">Ver Detalles</SoftButton>
                                <SoftButton size="lg">Secondary Action</SoftButton>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-mineral-600">PlainButton</h3>
                            <div className="flex gap-4 items-center">
                                <PlainButton size="md">Cancelar</PlainButton>
                                <PlainButton size="lg">Regresar</PlainButton>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FORMULARIOS & INPUTS */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-mineral-200 pb-2">3. Campos de Formulario</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                        <FormGroup label="Nombre Completo" htmlFor="demo-name" required>
                            <Input id="demo-name" placeholder="Ej. Ana Pérez" />
                        </FormGroup>

                        <FormGroup label="Correo Electrónico" htmlFor="demo-email" required error="El correo es inválido.">
                            <Input id="demo-email" type="email" defaultValue="ana@ejemplo" />
                        </FormGroup>

                        <FormGroup label="Teléfono de contacto" htmlFor="demo-phone" description="Opcional pero recomendado para notificaciones por SMS.">
                            <Input id="demo-phone" type="tel" placeholder="+52 ..." />
                        </FormGroup>

                        <FormGroup label="Campo Desactivado" htmlFor="demo-disabled">
                            <Input id="demo-disabled" disabled value="Información de solo lectura" />
                        </FormGroup>

                        <FormGroup label="Nivel de Compromiso" htmlFor="demo-select" required>
                            <Select id="demo-select">
                                <option value="">Seleccione una opción</option>
                                <option value="high">Alto - Priorizando el proceso</option>
                                <option value="medium">Medio - Adaptación con limitaciones</option>
                                <option value="low">Bajo - Buscando flexibilidad</option>
                            </Select>
                        </FormGroup>

                        <FormGroup label="Mensaje Adicional" htmlFor="demo-textarea">
                            <Textarea id="demo-textarea" placeholder="Escribe aquí cualquier contexto adicional..." />
                        </FormGroup>

                    </div>
                </section>

                {/* CHECKBOXES & RADIOS */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold border-b border-mineral-200 pb-2">4. Selección Múltiple y Única</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-obsidian-900">Checkboxes</h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox name="demo-chk" defaultChecked />
                                    <span className="text-obsidian-700 text-sm">Recibir notificaciones por correo</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox name="demo-chk" />
                                    <span className="text-obsidian-700 text-sm">Acepto los términos y condiciones</span>
                                </label>
                                <label className="flex items-center gap-3 opacity-50 cursor-not-allowed">
                                    <Checkbox name="demo-chk" disabled />
                                    <span className="text-obsidian-700 text-sm">Opción no disponible</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-obsidian-900">Radio Buttons</h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Radio name="demo-radio" value="1" defaultChecked />
                                    <span className="text-obsidian-700 text-sm">Frecuencia Semanal</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <Radio name="demo-radio" value="2" />
                                    <span className="text-obsidian-700 text-sm">Frecuencia Mensual</span>
                                </label>
                                <label className="flex items-center gap-3 opacity-50 cursor-not-allowed">
                                    <Radio name="demo-radio" value="3" disabled />
                                    <span className="text-obsidian-700 text-sm">Frecuencia Anual (Próximamente)</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    )
}
