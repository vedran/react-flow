import { ComponentType } from 'react';

import StraightEdge from '../../components/Edges/StraightEdge';
import BezierEdge from '../../components/Edges/BezierEdge';
import StepEdge from '../../components/Edges/StepEdge';
import SmoothStepEdge from '../../components/Edges/SmoothStepEdge';
import wrapEdge from '../../components/Edges/wrapEdge';

import { EdgeTypesType, EdgeCompProps } from '../../types';

export function createEdgeTypes(edgeTypes: EdgeTypesType): EdgeTypesType {
  const standardTypes: EdgeTypesType = {
    default: wrapEdge((edgeTypes.default || BezierEdge) as ComponentType<EdgeCompProps>),
    straight: wrapEdge((edgeTypes.bezier || StraightEdge) as ComponentType<EdgeCompProps>),
    step: wrapEdge((edgeTypes.step || StepEdge) as ComponentType<EdgeCompProps>),
    smoothstep: wrapEdge((edgeTypes.step || SmoothStepEdge) as ComponentType<EdgeCompProps>),
  };

  const wrappedTypes = {} as EdgeTypesType;
  const specialTypes: EdgeTypesType = Object.keys(edgeTypes)
    .filter((k) => !['default', 'bezier'].includes(k))
    .reduce((res, key) => {
      res[key] = wrapEdge((edgeTypes[key] || BezierEdge) as ComponentType<EdgeCompProps>);

      return res;
    }, wrappedTypes);

  return {
    ...standardTypes,
    ...specialTypes,
  };
}
