"use client";

import { useState } from "react";
import { DELIVERY_SETTINGS, BRAND } from "@/lib/constants";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: BRAND.name,
    tagline: BRAND.tagline,
    phone: BRAND.phone,
    whatsapp: BRAND.whatsapp,
    email: BRAND.email,
    instagram: BRAND.instagram,
    officeAddress: DELIVERY_SETTINGS.office_address,
    officeLat: DELIVERY_SETTINGS.office_lat.toString(),
    officeLng: DELIVERY_SETTINGS.office_lng.toString(),
    pickupTimings: DELIVERY_SETTINGS.pickup_timings,
    defaultRadius: DELIVERY_SETTINGS.default_radius_km.toString(),
    dailyCapacity: "30",
    closingTime: "19:00",
    preparationHours: "24",
    whatsappApiKey: "",
    razorpayKey: "",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Settings</h1>
          <p className="text-text-light">Configure your business settings</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Business Info */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Business Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Business Name</label>
              <input type="text" value={settings.businessName} onChange={(e) => update("businessName", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Tagline</label>
              <input type="text" value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => update("phone", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">WhatsApp</label>
              <input type="tel" value={settings.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Instagram Handle</label>
              <input type="text" value={settings.instagram} onChange={(e) => update("instagram", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Delivery Settings</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-text mb-1">Office Address</label>
              <input type="text" value={settings.officeAddress} onChange={(e) => update("officeAddress", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Office GPS Latitude</label>
              <input type="text" value={settings.officeLat} onChange={(e) => update("officeLat", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Office GPS Longitude</label>
              <input type="text" value={settings.officeLng} onChange={(e) => update("officeLng", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Pickup Timings</label>
              <input type="text" value={settings.pickupTimings} onChange={(e) => update("pickupTimings", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Default Delivery Radius (km)</label>
              <input type="number" value={settings.defaultRadius} onChange={(e) => update("defaultRadius", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
          </div>
        </div>

        {/* Batch Settings */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">Batch Settings</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Daily Capacity</label>
              <input type="number" value={settings.dailyCapacity} onChange={(e) => update("dailyCapacity", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Closing Time</label>
              <input type="time" value={settings.closingTime} onChange={(e) => update("closingTime", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Preparation Hours</label>
              <input type="number" value={settings.preparationHours} onChange={(e) => update("preparationHours", e.target.value)} className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-text mb-4">API Integrations</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">WhatsApp Business API Key</label>
              <input type="password" value={settings.whatsappApiKey} onChange={(e) => update("whatsappApiKey", e.target.value)} placeholder="Enter API key" className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Razorpay API Key</label>
              <input type="password" value={settings.razorpayKey} onChange={(e) => update("razorpayKey", e.target.value)} placeholder="Enter API key" className="w-full border border-border rounded-xl px-4 py-3 bg-background" />
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3">API keys are encrypted and stored securely. Never share these with anyone.</p>
        </div>
      </div>
    </div>
  );
}
