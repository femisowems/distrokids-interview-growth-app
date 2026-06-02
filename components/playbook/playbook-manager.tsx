"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PlaybookManager() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      id: "create",
      title: "Create a brief",
      desc: "Open the Studio and create a new campaign brief.",
      href: "/studio",
    },
    {
      id: "preview",
      title: "Launch preview",
      desc: "Jump to the launch preview to inspect landing sections.",
      href: "/#launch-preview",
    },
    {
      id: "publish",
      title: "Publish draft",
      desc: "Publish your brief to the in-memory API to simulate a release.",
    },
  ];

  useEffect(() => {
    try {
      const shown = localStorage.getItem("playbook.initialShown");
      const isEnabled = localStorage.getItem("playbook.enabled");
      const savedStep = localStorage.getItem("playbook.step");
      if (isEnabled === "1") {
        setEnabled(true);
        setStep(savedStep ? parseInt(savedStep, 10) : 0);
      }
      if (!shown) {
        setOpen(true);
        localStorage.setItem("playbook.initialShown", "1");
      }
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Playbook
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 mx-auto max-w-5xl rounded-2xl bg-[#06101a]/90 p-8 shadow-xl ring-1 ring-white/6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Playbook Mode
                </h3>
                <p className="mt-3 text-lg text-white/70">
                  Enable Playbook Mode to highlight the core interview demo
                  flow: create → preview → publish. Use the guided steps below
                  or explore manually.
                </p>
                <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-white/50">
                  <strong>Notice:</strong> This application was created as part
                  of an interview process and is not affiliated with, endorsed
                  by, or operated by DistroKid.
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    className="rounded-full px-8 py-3 bg-gradient-to-r from-neon-400 to-sunset-400 text-black text-lg"
                  >
                    <Link href="/studio">Open Studio</Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-3"
                    onClick={() => {
                      try {
                        if (window.location.pathname === "/") {
                          const el = document.getElementById("launch-preview");
                          if (el)
                            return el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                        }
                      } catch (e) {}
                      router.push("/#launch-preview");
                    }}
                  >
                    Jump to Launch Preview
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="rounded-full px-6 py-3"
                  >
                    <Link href="/landing/afterimage">
                      Open Featured Landing
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                  <Button
                    className="rounded-full px-8 py-3 bg-gradient-to-r from-neon-400 to-sunset-400 text-black text-lg"
                    onClick={() => {
                      setEnabled(true);
                      setOpen(false);
                      setStep(0);
                      try {
                        localStorage.setItem("playbook.enabled", "1");
                        localStorage.setItem("playbook.step", "0");
                      } catch (e) {}
                    }}
                  >
                    Enable Playbook Mode
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {enabled && (
        <div className="fixed right-6 bottom-6 z-60 w-96 rounded-lg bg-[#07121a]/95 p-4 ring-1 ring-white/6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-white">
                Playbook — Step {step + 1} of {steps.length}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {steps[step]?.title}
              </div>
              <div className="mt-2 text-sm text-white/60">
                {steps[step]?.desc}
              </div>
            </div>
            <div className="ml-4 flex flex-col items-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // disable
                  setEnabled(false);
                  try {
                    localStorage.removeItem("playbook.enabled");
                    localStorage.removeItem("playbook.step");
                  } catch (e) {}
                }}
              >
                Disable
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const next = Math.max(0, step - 1);
                setStep(next);
                try {
                  localStorage.setItem("playbook.step", String(next));
                } catch (e) {}
              }}
            >
              Back
            </Button>

            <Button
              size="sm"
              onClick={() => {
                const next = step + 1;
                // If this step has a href, navigate there; special-case publish to open composer with autoplay
                if (steps[step]?.href) {
                  try {
                    router.push(steps[step].href as any);
                  } catch (e) {
                    window.location.href = steps[step].href;
                  }
                } else if (steps[step]?.id === "publish") {
                  // open the studio composer and trigger playbook autofill + autopublish
                  try {
                    router.push("/studio?playbook=1&autopublish=1");
                  } catch (e) {
                    window.location.href = "/studio?playbook=1&autopublish=1";
                  }
                }

                if (next >= steps.length) {
                  // completed
                  setStep(steps.length - 1);
                  try {
                    localStorage.setItem(
                      "playbook.step",
                      String(steps.length - 1),
                    );
                  } catch (e) {}
                } else {
                  setStep(next);
                  try {
                    localStorage.setItem("playbook.step", String(next));
                  } catch (e) {}
                }
              }}
            >
              {step + 1 >= steps.length ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
