"use client";

import React from "react";
import { toast } from "sonner";
import { ButtonProps } from "@/components/ui/button";
import { useFathomEvent } from "@/hooks/useFathom";

interface ContactButtonProps extends ButtonProps {
  label: string;
  email: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  label,
  email,
  className,
  ...props
}) => {
  const { trackEvent } = useFathomEvent();
  const handleClick = () => {
    trackEvent("Email Contact Button Click");
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard", {
      //   description: "Click to open your mail client",
      action: {
        label: "Open Mail Client",
        onClick: () => (window.location.href = `mailto:${email}`),
      },
    });
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {label}
    </button>
  );
};

export default ContactButton;
// TODO add fathom events
