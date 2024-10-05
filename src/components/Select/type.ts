export interface SelectProps {
  selectedItem: string;
  options: string[];
  handleSelectedItem: (item: string) => void;
}
