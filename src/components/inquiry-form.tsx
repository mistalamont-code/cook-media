"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceType = "WEDDING" | "LIVE_SOUND" | "SPEAKING_BOOK";

interface FormData {
  serviceType: ServiceType | "";
  name: string;
  email: string;
  phone: string;
  message: string;
  // Wedding fields
  eventDate: string;
  venue: string;
  guestCount: string;
  partnerName: string;
  // Live sound fields
  eventType: string;
  attendees: string;
  // Speaking fields
  topic: string;
  audience: string;
}

const initialFormData: FormData = {
  serviceType: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  eventDate: "",
  venue: "",
  guestCount: "",
  partnerName: "",
  eventType: "",
  attendees: "",
  topic: "",
  audience: "",
};

const serviceOptions: { value: ServiceType; label: string; description: string }[] = [
  {
    value: "WEDDING",
    label: "Wedding",
    description: "Photography, videography, and livestreaming for your special day",
  },
  {
    value: "LIVE_SOUND",
    label: "Live Sound / AV",
    description: "Professional sound and AV production for events and performances",
  },
  {
    value: "SPEAKING_BOOK",
    label: "Speaking / Book",
    description: "Speaking engagements, book orders, and author consulting",
  },
];

export function InquiryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="text-5xl">✓</div>
        <h2 className="text-2xl font-bold">Thank you, {form.name}!</h2>
        <p className="text-brand-text-muted max-w-md mx-auto">
          Your inquiry has been received. Corey will personally review your
          details and get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "h-2 rounded-full transition-all",
              s === step ? "w-8 bg-brand-purple" : s < step ? "w-8 bg-brand-gold" : "w-8 bg-gray-200"
            )}
          />
        ))}
      </div>

      {/* Step 1: Service Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">What can we help you with?</h2>
            <p className="text-brand-text-muted mt-1">Select the service you&apos;re interested in</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {serviceOptions.map((opt) => (
              <Card
                key={opt.value}
                hover
                onClick={() => {
                  update("serviceType", opt.value);
                  setStep(2);
                }}
                className={cn(
                  "text-center cursor-pointer transition-all",
                  form.serviceType === opt.value && "ring-2 ring-brand-purple"
                )}
              >
                <h3 className="font-semibold text-lg mb-2">{opt.label}</h3>
                <p className="text-sm text-brand-text-muted">{opt.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Service-specific fields */}
      {step === 2 && (
        <div className="space-y-6 max-w-lg mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Tell us about your event</h2>
            <p className="text-brand-text-muted mt-1">
              {form.serviceType === "WEDDING" && "Share the details of your big day"}
              {form.serviceType === "LIVE_SOUND" && "Tell us about your event or performance"}
              {form.serviceType === "SPEAKING_BOOK" && "What are you looking for?"}
            </p>
          </div>

          <Input
            label="Event Date"
            type="date"
            id="eventDate"
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
          />

          {form.serviceType === "WEDDING" && (
            <>
              <Input
                label="Your Partner's Name"
                id="partnerName"
                placeholder="e.g., Jordan"
                value={form.partnerName}
                onChange={(e) => update("partnerName", e.target.value)}
              />
              <Input
                label="Venue"
                id="venue"
                placeholder="e.g., The Brewerie at Union Station"
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
              />
              <Input
                label="Estimated Guest Count"
                id="guestCount"
                type="number"
                placeholder="e.g., 150"
                value={form.guestCount}
                onChange={(e) => update("guestCount", e.target.value)}
              />
            </>
          )}

          {form.serviceType === "LIVE_SOUND" && (
            <>
              <Input
                label="Event Type"
                id="eventType"
                placeholder="e.g., Corporate event, Concert, Church service"
                value={form.eventType}
                onChange={(e) => update("eventType", e.target.value)}
              />
              <Input
                label="Expected Attendance"
                id="attendees"
                type="number"
                placeholder="e.g., 200"
                value={form.attendees}
                onChange={(e) => update("attendees", e.target.value)}
              />
            </>
          )}

          {form.serviceType === "SPEAKING_BOOK" && (
            <>
              <Input
                label="Topic / Subject"
                id="topic"
                placeholder="e.g., Life after high school, Leadership"
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
              />
              <Input
                label="Audience"
                id="audience"
                placeholder="e.g., High school students, Young professionals"
                value={form.audience}
                onChange={(e) => update("audience", e.target.value)}
              />
            </>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact info */}
      {step === 3 && (
        <div className="space-y-6 max-w-lg mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold">How can we reach you?</h2>
            <p className="text-brand-text-muted mt-1">We&apos;ll follow up within 24-48 hours</p>
          </div>

          <Input
            label="Your Name"
            id="name"
            placeholder="e.g., Jane Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="e.g., jane@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <Input
            label="Phone Number (optional)"
            id="phone"
            type="tel"
            placeholder="e.g., (814) 555-1234"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <Textarea
            label="Anything else you'd like us to know?"
            id="message"
            placeholder="Tell us about your vision, questions, or special requests..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
          />

          {error && (
            <p className="text-sm text-brand-error bg-red-50 rounded-lg p-3">{error}</p>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !form.name || !form.email}
              className="flex-1"
            >
              {submitting ? "Sending..." : "Submit Inquiry"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
