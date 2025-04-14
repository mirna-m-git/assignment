// @vitest-environment nuxt

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useToast } from "../toast";

// Mock Toast and toast group element
const mockAddToast = vi.fn();
const mockDismiss = vi.fn();

const mockToastGroup = {
  addToast: mockAddToast,
};

const mockToast = {
  dismiss: mockDismiss,
};

describe("useToast", () => {
  let originalQuerySelector: typeof document.querySelector;

  beforeEach(() => {
    originalQuerySelector = document.querySelector;
    mockAddToast.mockReset();
    mockDismiss.mockReset();
  });

  afterEach(() => {
    // Restore original implementation
    document.querySelector = originalQuerySelector;
  });

  it("calls addToast with correct message and default variant", () => {
    document.querySelector = vi.fn(() => mockToastGroup as any);
    mockAddToast.mockReturnValue(mockToast);

    const { show } = useToast();
    show("Test message");

    expect(document.querySelector).toHaveBeenCalledWith("provet-toast-group");
    expect(mockAddToast).toHaveBeenCalledWith("Test message", { variant: "default" });
  });

  it("calls addToast with danger variant when using error()", () => {
    document.querySelector = vi.fn(() => mockToastGroup as any);
    mockAddToast.mockReturnValue(mockToast);

    const { error } = useToast();
    error("Error occurred");

    expect(mockAddToast).toHaveBeenCalledWith("Error occurred", { variant: "danger" });
  });

  it("calls dismiss on remove()", () => {
    document.querySelector = vi.fn(() => mockToastGroup as any);
    mockAddToast.mockReturnValue(mockToast);

    const { show, remove } = useToast();
    show("To be removed");
    remove();

    expect(mockDismiss).toHaveBeenCalled();
  });

  it("does nothing if toast group is not found", () => {
    document.querySelector = vi.fn(() => null);

    const { show, error, remove } = useToast();
    show("Missing toast group");
    error("Still missing");
    remove();

    expect(mockAddToast).not.toHaveBeenCalled();
    expect(mockDismiss).not.toHaveBeenCalled();
  });
});
