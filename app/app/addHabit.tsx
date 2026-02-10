import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import ControlledTextField from "@/components/ContolledTextField";

type FormValues = {
  habitTitle: string;
};

export default function AddHabitsScreen() {
  // control object to manage form state and validation rules
  // handleSubmit function to handle form submission and validation
  // formState to keep track of form errors and other state information
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submit = (data) => {
    console.log("Form data:", data);
    // Here you can handle the form submission, e.g., send data to your backend or update state
  };
  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <Text style={{ color: "green", fontSize: 20 }}>Add Habit</Text>
      {/* connecting the react native text component to RHF, making it controleld */}
      <ControlledTextField
        control={control}
        name="habitTitle"
        placeholder="Habit title"
        rules={{ required: "Habit title is required" }}
        errors={errors}
      />
      {/* connect the button to the data on RHF */}
      <Button title="Save" onPress={handleSubmit(submit)} />
    </SafeAreaView>
  );
}
