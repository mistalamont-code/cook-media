"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceType = "WEDDING" | "EVENT" | "LIVE_SOUND";

interface FormData {
  serviceType: ServiceType | "";
  // Contact fields (collected on step 2 for all paths)
  name: string;
  email: string;
  phone: string;
  referralSource: string;
  // Common
  eventDate: string;
  message: string;
  // Wedding fields
  venue: string;
  guestCount: string;
  partnerName: string;
  packageInterest: string;
  // Event fields
  eventType: string;
  attendees: string;
  servicesNeeded: string[];
  // Live Sound fields
  liveSoundVenue: string;
}

const initialFormData: FormData = {
  serviceType: "",
  name: "",
  email: "",
  phone: "",
  referralSource: "",
  eventDate: "",
  message: "",
  venue: "",
  guestCount: "",
  partnerName: "",
  packageInterest: "",
  eventType: "",
  attendees: "",
  servicesNeeded: [],
  liveSoundVenue: "",
};

const serviceOptions: { value: ServiceType; label: string; description: string }[] = [
  {
    value: "WEDDING",
    label: "Wedding",
    description: "Photography, videography, and livestreaming for your special day",
  },
  {
    value: "EVENT",
    label: "Event Photography & Video",
    description: "Professional photo and video coverage for corporate, community, and private events",
  },
  {
    value: "LIVE_SOUND",
    label: "Live Sound / AV",
    description: "Professional sound and AV production for events and performances",
  },
];

const validServiceTypes: ServiceType[] = ["WEDDING", "EVENT", "LIVE_SOUND"];

const referralOptions = [
  { value: "", label: "Select one (optional)" },
  { value: "Google", label: "Google" },
  { value: "Instagram", label: "Instagram" },
  { value: "Referral", label: "Referral" },
  { value: "Venue Partner", label: "Venue Partner" },
  { value: "Other", label: "Other" },
];

const eventTypeOptions = [
  { value: "", label: "Select event type" },
  { value: "Corporate", label: "Corporate" },
  { value: "Community", label: "Community" },
  { value: "Nonprofit", label: "Nonprofit" },
  { value: "Private Party", label: "Private Party" },
  { value: "Other", label: "Other" },
];

const packageOptions = [
  { value: "", label: "Select a package (optional)" },
  { value: "Package 1", label: "Package 1 ($3,000)" },
  { value: "Package 2", label: "Package 2 ($2,000)" },
  { value: "Package 3", label: "Package 3 ($1,500)" },
  { value: "Not Sure", label: "Not Sure" },
];

interface InquiryFormProps {
  defaultService?: string;
}

export function InquiryForm({ defaultService }: InquiryFormProps) {
  const isValidDefault = defaultService && validServiceTypes.includes(defaultService as ServiceType);
  const [step, setStep] = useState(isValidDefault ? 2 : 1);
  const [form, setForm] = useState<FormData>({
    ...initialFormData,
    ...(isValidDefault ? { serviceType: defaultService as ServiceType } : {}),
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isStep2Valid = form.name.trim().length > 0 && isEmailValid && form.phone.trim().length > 0;

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleServiceNeeded(service: string) {
    setForm((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service],
    }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    try {
      // Map form data to API shape
      const payload: Record<string, unknown> = {
        serviceType: form.serviceType,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        referralSource: form.referralSource || null,
        eventDate: form.eventDate || null,
        message: form.message || null,
      };

      if (form.serviceType === "WEDDING") {
        payload.venue = form.venue || null;
        payload.guestCount = form.guestCount || null;
        payload.partnerName = form.partnerName || null;
        payload.packageInterest = form.packageInterest || null;
      } else if (form.serviceType === "EVENT") {
        payload.eventType = form.eventType || null;
        payload.venue = form.venue || null;
        payload.attendees = form.attendees || null;
        payload.servicesNeeded = form.servicesNeeded;
      } else if (form.serviceType === "LIVE_SOUND") {
        payload.eventType = form.eventType || null;
        payload.attendees = form.attendees || null;
        payload.venue = form.liveSoundVenue || null;
      }

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="text-center space-y-8 py-12" role="status" aria-live="polite">
        <div className="space-y-4">
          <div className="text-5xl" aria-hidden="true">&check;</div>
          <h2 className="text-2xl font-bold">Thank you, {form.name}!</h2>
          <p className="text-brand-text-muted max-w-md mx-auto">
            Your inquiry has been received. Corey will personally review your
            details and get back to you within 24-48 hours.
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-xl border border-white/8 bg-brand-card p-6 text-left space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted text-center">
            What Happens Next
          </h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">1</span>
              <span className="text-sm text-brand-text">We review your inquiry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">2</span>
              <span className="text-sm text-brand-text">You receive a custom proposal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">3</span>
              <span className="text-sm text-brand-text">Approve and we lock in your date</span>
            </li>
          </ol>
        </div>

        <Link href="/">
          <Button variant="outline">Back to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-300",
              s <= step ? "w-8 bg-brand-red" : "w-8 bg-white/10"
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
                  form.serviceType === opt.value && "ring-2 ring-brand-red/20"
                )}
              >
                <h3 className="font-semibold text-lg mb-2">{opt.label}</h3>
                <p className="text-sm text-brand-text-muted">{opt.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Contact info */}
      {step === 2 && (
        <div className="space-y-6 max-w-lg mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold">How can we reach you?</h2>
            <p className="text-brand-text-muted mt-1">We&apos;ll follow up within 24-48 hours</p>
          </div>

          <Input
            label="Full Name"
            id="name"
            autoComplete="name"
            placeholder="e.g., Jane Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <div>
            <Input
              label="Email Address"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="e.g., jane@example.com"
              value={form.email}
              onChange={(e) => {
                update("email", e.target.value);
                setEmailTouched(true);
              }}
              onBlur={() => setEmailTouched(true)}
              required
            />
            {emailTouched && form.email && !isEmailValid && (
              <p className="text-sm text-brand-error mt-1.5">Please enter a valid email</p>
            )}
          </div>
          <Input
            label="Phone Number"
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g., (814) 555-1234"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
          <Select
            label="How did you hear about us?"
            id="referralSource"
            options={referralOptions.slice(1)}
            placeholder="Select one (optional)"
            value={form.referralSource}
            onChange={(e) => update("referralSource", e.target.value)}
          />

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!isStep2Valid}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Service-specific fields */}
      {step === 3 && (
        <div className="space-y-6 max-w-lg mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Tell us about your event</h2>
            <p className="text-brand-text-muted mt-1">
              {form.serviceType === "WEDDING" && "Share the details of your big day"}
              {form.serviceType === "EVENT" && "Tell us about the event you need covered"}
              {form.serviceType === "LIVE_SOUND" && "Tell us about your event or performance"}
            </p>
          </div>

          <Input
            label="Event Date"
            type="date"
            id="eventDate"
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
          />

          {/* Wedding-specific fields */}
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
              <Select
                label="Package Interest"
                id="packageInterest"
                options={packageOptions.slice(1)}
                placeholder="Select a package (optional)"
                value={form.packageInterest}
                onChange={(e) => update("packageInterest", e.target.value)}
              />
            </>
          )}

          {/* Event-specific fields */}
          {form.serviceType === "EVENT" && (
            <>
              <Select
                label="Event Type"
                id="eventType"
                options={eventTypeOptions.slice(1)}
                placeholder="Select event type"
                value={form.eventType}
                onChange={(e) => update("eventType", e.target.value)}
              />
              <Input
                label="Venue / Location"
                id="venue"
                placeholder="e.g., Bayfront Convention Center"
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
              />
              <Input
                label="Expected Attendance"
                id="attendees"
                type="number"
                placeholder="e.g., 200"
                value={form.attendees}
                onChange={(e) => update("attendees", e.target.value)}
              />
              <fieldset>
                <legend className="block text-xs font-medium uppercase tracking-wider text-brand-text-muted mb-2">
                  Services Needed
                </legend>
                <div className="flex flex-wrap gap-3">
                  {["Photography", "Videography", "Both"].map((svc) => (
                    <label
                      key={svc}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm cursor-pointer transition-colors duration-300",
                        form.servicesNeeded.includes(svc)
                          ? "border-brand-red bg-brand-red/10 text-brand-text"
                          : "border-white/10 bg-brand-surface text-brand-text-muted hover:border-white/20"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={form.servicesNeeded.includes(svc)}
                        onChange={() => toggleServiceNeeded(svc)}
                        className="sr-only"
                      />
                      {svc}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {/* Live Sound-specific fields */}
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
              <Input
                label="Venue / Location"
                id="liveSoundVenue"
                placeholder="e.g., Warner Theatre"
                value={form.liveSoundVenue}
                onChange={(e) => update("liveSoundVenue", e.target.value)}
              />
            </>
          )}

          <Textarea
            label="Additional Details"
            id="message"
            placeholder="Tell us about your vision, questions, or special requests..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
          />

          {error && (
            <p className="text-sm text-brand-error bg-red-500/10 rounded-lg p-3" role="alert" aria-live="polite">{error}</p>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
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
