"use client";
import { useState } from "react";
import { Sun, Moon, PhoneCall, Clock } from "lucide-react";

function Modal({ open = true, onClose = () => {}, children, size = "md" }) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} mx-4`}>
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

const schedules = [
  {
    id: "morning",
    title: "Morning",
    icon: <Sun className="text-blue" size={20} />,
    timeRange: "9:00AM to 12:00PM",
    start: "9:00AM",
    end: "9:40AM",
    color: "white",
  },
  {
    id: "afternoon",
    title: "Afternoon",
    icon: <Sun className="text-yellow-500" size={20} />,
    timeRange: "12:00PM to 3:00PM",
    start: "12:00PM",
    end: "12:40PM",
    color: "white",
  },
  {
    id: "evening",
    title: "Evening",
    icon: <PhoneCall className="text-pink-600" size={20} />,
    timeRange: "3:00PM to 6:00PM",
    start: "3:00PM",
    end: "3:40PM",
    color: "white",
  },
];

export default function SetInspection({ open, onClose }) {
  const [data, setData] = useState(
    schedules.map((s) => ({
      ...s,
      enabled: true,
      durations: [{ start: s.start, end: s.end }],
    }))
  );

  const toggleSchedule = (id) => {
    setData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleTimeChange = (id, index, field, value) => {
    setData((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newDurations = [...s.durations];
          newDurations[index][field] = value;
          return { ...s, durations: newDurations };
        }
        return s;
      })
    );
  };

  const addDuration = (id) => {
    setData((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, durations: [...s.durations, { start: "", end: "" }] }
          : s
      )
    );
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <h2 className="text-2xl font-bold mb-1">Set Inspection Timing</h2>
      <p className="text-text-muted mb-6">
        Configure available time for car inspections.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((schedule) => (
          <div
            key={schedule.id}
            className={`rounded-lg border border-text-muted/40 p-5 shadow ${schedule.color}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {schedule.icon}
                  <span className="font-medium">{schedule.title}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {schedule.timeRange}
                </span>
              </div>

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={schedule.enabled}
                  onChange={() => toggleSchedule(schedule.id)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            {schedule.durations.map((duration, index) => (
              <div key={index} className="mb-3">
                <div className="mb-2">
                  <label className="text-sm text-gray-700">Start Time</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={duration.start}
                      onChange={(e) =>
                        handleTimeChange(
                          schedule.id,
                          index,
                          "start",
                          e.target.value
                        )
                      }
                      placeholder="Start"
                      className="w-full border rounded-md p-2 pr-8 mt-1 border-text-muted/40 focus:border-blue focus:ring-none focus:outline-none"
                    />
                    <Clock
                      size={16}
                      className="absolute right-2 top-3 text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700">End Time</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={duration.end}
                      onChange={(e) =>
                        handleTimeChange(
                          schedule.id,
                          index,
                          "end",
                          e.target.value
                        )
                      }
                      placeholder="End"
                      className="w-full border rounded-md p-2 pr-8 mt-1  border-text-muted/40 focus:border-blue focus:ring-none focus:outline-none"
                    />
                    <Clock
                      size={16}
                      className="absolute right-2 top-3 text-gray-400"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => addDuration(schedule.id)}
              className="text-blue text-sm font-medium mt-2"
            >
              + Add Duration
            </button>

            <button className="w-full mt-4 py-2 text-white rounded-md bg-blue">
              Update {schedule.title} Schedule
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}
