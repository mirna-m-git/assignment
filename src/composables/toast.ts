import type { Toast } from "@provetcloud/web-components";

export function useToast() {
  const toast = ref<Toast | null>(null);
  const show = (message: string, variant: "default" | "danger" = "default") => {
    const toastGroup = document.querySelector("provet-toast-group");
    if (toastGroup) {
      toast.value = toastGroup.addToast(message, { variant });
    }
    return null;
  };
  const error = (message: string) => {
   show(message, "danger");
  };
  const remove = () => {
    const toastGroup = document.querySelector("provet-toast-group");
    if (toastGroup) {
      toast.value?.dismiss();
    }
  };
  return { show, error, remove };
}
