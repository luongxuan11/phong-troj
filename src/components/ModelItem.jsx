import React, {useRef} from 'react'

const ModelItem = ({ name, defaultText, textToLower, queries, handleSubmit, content }) => {

  return (
    <div className="model-province__content">
      <div className="model-province__content__item">
        <input
          className="model-province__content__item--normal"
          type="radio"
          id="default"
          name={name}
          value={defaultText || textToLower || ""}
          checked={!queries[`${[name]}Code`] ? true : false}
          readOnly
          onChange={(e) =>
            handleSubmit(e, {
              [name]: defaultText,
              [`${[name]}Code`]: null,
            })
          }
        />
        <label htmlFor="default">{defaultText}</label>
      </div>
      {content?.map((item) => {
        return (
          <div key={item.id} className="model-province__content__item">
            <input
              className="model-province__content__item--normal"
              type="radio"
              name={name}
              id={item.id}
              value={item.code}
              checked={item.code === queries[`${[name]}Code`] ? true : false}
              readOnly
              onChange={(e) =>
                handleSubmit(e, {
                  [name]: item.value,
                  [`${[name]}Code`]: item.code,
                })
              }
            />
            <label htmlFor={item.id}>{item.value}</label>
          </div>
        );
      })}
    </div>
  );
}

export default ModelItem