import { TextInput, View, Text } from "react-native";
import { FieldError } from "react-hook-form";

// RHF built in types
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { TextInputProps } from "react-native";

interface ControlledTextFieldProps<
  T extends FieldValues,
> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  rules?: any;
  //  Give me the error object that matches the same form this field belongs to
  errors?: FieldErrors<T>;
}

const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  rules,
  ...textInputProps
}: ControlledTextFieldProps<T>) => {
  // const error = errors?.[name] as FieldError | undefined;

  // console.log("ControlledTextField error:", errors?.[name]);
  return (
    <View>
      {/* connecting the react native text component to RHF, making it controlled */}
      <Controller
        name={name}
        control={control}
        // field contains the event handlers and value for the input field
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              {...textInputProps}
              className={`w-full bg-input rounded-md placeholder:p-4 mb-1 ${error ? "border border-error" : ""}`}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            {error && (
              <Text className="text-error">{error.message || "Error"}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default ControlledTextField;
