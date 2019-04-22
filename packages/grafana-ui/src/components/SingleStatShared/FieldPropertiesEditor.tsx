// Libraries
import React, { PureComponent, ChangeEvent } from 'react';

// Components
import { FormField, FormLabel, PanelOptionsGroup, UnitPicker, SelectOptionItem } from '@grafana/ui';

// Types
import { Field } from '../../types/data';

const labelWidth = 6;

export interface Props {
  options: Partial<Field>;
  onChange: (fieldProperties: Partial<Field>) => void;
  showMinMax: boolean;
  showPrefixSuffix: boolean;
}

export class FieldPropertiesEditor extends PureComponent<Props> {
  onUnitChange = (unit: SelectOptionItem) => this.props.onChange({ ...this.props.options, unit: unit.value });

  onDecimalChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({
      ...this.props.options,
      decimals: parseInt(event.target.value, 10), // May be NaN
    });
  };

  onMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({
      ...this.props.options,
      min: parseInt(event.target.value, 10), // May be NaN
    });
  };

  onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({
      ...this.props.options,
      min: parseInt(event.target.value, 10), // May be NaN
    });
  };

  onPrefixChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.props.onChange({ ...this.props.options, prefix: event.target.value });
  onSuffixChange = (event: ChangeEvent<HTMLInputElement>) =>
    this.props.onChange({ ...this.props.options, suffix: event.target.value });

  render() {
    const { showPrefixSuffix, showMinMax } = this.props;
    const { unit, decimals, min, max, prefix, suffix } = this.props.options;

    return (
      <PanelOptionsGroup title="Field">
        <>
          <div className="gf-form">
            <FormLabel width={labelWidth}>Unit</FormLabel>
            <UnitPicker defaultValue={unit} onChange={this.onUnitChange} />
          </div>
          <FormField
            label="Decimals"
            labelWidth={labelWidth}
            placeholder="auto"
            onChange={this.onDecimalChange}
            value={toDecimalString(decimals)}
            type="number"
          />
          {showMinMax && (
            <>
              <FormField
                label="Min"
                labelWidth={labelWidth}
                onChange={this.onMinChange}
                value={toDecimalString(min)}
                type="number"
              />
              <FormField
                label="Max"
                labelWidth={labelWidth}
                onChange={this.onMaxChange}
                value={toDecimalString(max)}
                type="number"
              />
            </>
          )}
          {showPrefixSuffix && (
            <>
              <FormField label="Prefix" labelWidth={labelWidth} onChange={this.onPrefixChange} value={prefix || ''} />
              <FormField label="Suffix" labelWidth={labelWidth} onChange={this.onSuffixChange} value={suffix || ''} />
            </>
          )}
        </>
      </PanelOptionsGroup>
    );
  }
}

function toDecimalString(value: number | undefined | null) {
  if (value !== null && value !== undefined && Number.isFinite(value as number)) {
    return value.toString();
  }
  return '';
}
