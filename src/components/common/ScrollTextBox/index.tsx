import st from './ScrollTextBox.module.scss';

interface ScrollTextBoxProps {
  title: string;
  content: string;
  disabled: boolean;
  style?: {
    marginLeft?: string;
    width?: string;
    height?: string;
    marginTop?: string;
  };
}

export const ScrollTextBox = ({ style, title, disabled, content }: ScrollTextBoxProps) => {
  return (
    <div style={style} className={`${st.container} ${disabled ? '' : st.on}`}>
      <div className={st.container_texts}>
        <p className={st.container_title}>{title}</p>
        {/* <p className={st.container_date}>{date}</p> */}
      </div>
      <textarea disabled={disabled} className={st.container_textarea} defaultValue={content} />
    </div>
  );
};
