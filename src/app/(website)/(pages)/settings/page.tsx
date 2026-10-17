
"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../component/layout/PageHeader/page";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("etsy-settings");

      if (stored) {
        const settings = JSON.parse(stored);

        if (["USD", "PKR", "EUR", "GBP"].includes(settings.currency)) {
          setCurrency(settings.currency);
        }

        if (typeof settings.notifications === "boolean") {
          setNotifications(settings.notifications);
        }
      }
    } catch {
      // Use default settings if stored data cannot be read.
    }
  }, []);

  function saveSettings() {
    try {
      localStorage.setItem(
        "etsy-settings",
        JSON.stringify({ currency, notifications })
      );
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your preferences for the Etsy research dashboard."
      />

      <div className="max-w-2xl space-y-6">
        <section className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h2 className="text-lg font-semibold">General Preferences</h2>

          <label
            htmlFor="currency"
            className="mt-5 block text-sm font-medium text-gray-300"
          >
            Preferred Currency
          </label>

          <select
            id="currency"
            value={currency}
            onChange={(event) => {
              setCurrency(event.target.value);
              setSaved(false);
            }}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-3 text-white outline-none focus:border-orange-500"
          >
            <option value="USD">USD — US Dollar</option>
            <option value="PKR">PKR — Pakistani Rupee</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
          </select>

          <p className="mt-2 text-sm text-gray-500">
            This saves your preference. It does not convert Etsy prices yet.
          </p>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <h2 className="text-lg font-semibold">Notifications</h2>

          <label className="mt-4 flex cursor-pointer items-center justify-between gap-4">
            <span>
              <span className="block font-medium">Enable notifications</span>
              <span className="mt-1 block text-sm text-gray-400">
                Save your notification preference for future features.
              </span>
            </span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => {
                setNotifications(event.target.checked);
                setSaved(false);
              }}
              className="h-5 w-5 accent-orange-500"
            />
          </label>
        </section>

        <button
          type="button"
          onClick={saveSettings}
          className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Save Settings
        </button>

        {saved && (
          <p role="status" className="text-sm text-green-400">
            Settings saved successfully!
          </p>
        )}
      </div>
    </div>
  );
}
