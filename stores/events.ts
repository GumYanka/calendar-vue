import { defineStore } from "pinia";

export const useEventsStore = defineStore("events", {
  state: () => ({
    events: [] as { id: string; title: string; start: string; color: string }[],
  }),
  actions: {
    addEvent(event: any) {
      this.events.push({ id: Date.now().toString(), ...event });
    },
    editEvent(id: string, newData: any) {
      const idx = this.events.findIndex((e) => e.id === id);
      if (idx > -1) this.events[idx] = { ...this.events[idx], ...newData };
    },
    deleteEvent(id: string) {
      this.events = this.events.filter((e) => e.id !== id);
    },
  },
});
