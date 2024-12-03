<!-- <template>
    <div class="container">
        <h1>Calendario</h1>
        <FullCalendar :options="calendarOptions" ref="calendar" @dateClick="handleDateClick" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// import { Calendar } from '@fullcalendar/core'
import multiMonthPlugin from '@fullcalendar/multimonth'

// Importa el idioma español
import esLocale from '@fullcalendar/core/locales/es';

export default defineComponent({
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, multiMonthPlugin],
                timeZone: 'America/Bogota',
                // initialView: 'timeGridDay', // Utiliza la vista detallada de día
                initialView: 'multiMonthYear',
                weekends: true,
                locale: esLocale, // Configura el idioma español
                buttonText: {
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    dayGridMonth: 'Mes',
                    timeGridWeek: 'Semana',
                    timeGridDay: 'Día'
                },
                events: [
                    { title: 'Reunión', start: new Date() }
                ],
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'today,dayGridMonth,timeGridWeek,dayGridYear' // Botones para cambiar entre vistas
                },
                // views: {
                //     timeGridDay: {
                //         // Configuración específica de la vista detallada de día (opcional)
                //         slotDuration: '00:30:00', // Duración de las ranuras de 30 minutos
                //         scrollTime: '08:00:00' // Hora inicial de desplazamiento
                //     }
                // }
                views: {
                    multiMonthFourMonth: {
                        type: 'multiMonth',
                        duration: { months: 4 }
                    }
                }
            }
        };
    },
    methods: {
        handleDateClick(info) {
            const calendarApi = this.$refs.calendar.getApi();
            calendarApi.addEvent({
                title: 'Nuevo Evento',
                start: info.date,
                allDay: info.allDay
            });
        }
    }
});
</script>

<style>
/* Estilos opcionales si los necesitas */
.fc .fc-col-header-cell-cushion {
    display: inline-block;
    padding: 2px 4px;
}

.fc .fc-col-header-cell-cushion {
    padding-top: 5px;
    padding-bottom: 5px;
}
</style> -->