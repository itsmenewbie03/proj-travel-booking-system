import toast,{Toaster} from "svelte-french-toast";

const _alert = (success: boolean, message: string) => {
    const _toast = success ? toast.success : toast.error;
    _toast(message, {
        style: "background: #15191e; color:#a6adba; border: 1px solid black",
        duration: 3000,
    });
};
export { _alert,Toaster };
