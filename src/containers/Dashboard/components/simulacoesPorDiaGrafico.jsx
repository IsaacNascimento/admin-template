import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Spinner } from 'reactstrap';
import Panel from '@/shared/components/Panel';
import getTooltipStyles from '@/shared/helpers';

const brush = (theme) => {
  if (theme === 'theme-light') {
    return '#f2f4f7';
  }
  return '#38373f';
};

const SimulacoesPorDiaGrafico = ({ theme, dir }) => {
  const stats = useSelector((state) => state.simulacoes.stats);
  const isFetching = useSelector((state) => state.simulacoes.isFetching);

  return (
    <Panel
      xl={8}
      lg={7}
      md={12}
      xs={12}
      title="Simulações"
      subhead="Quantidade de simulações diárias"
    >
      {isFetching && <Spinner className="table-fetch-spinner" />}
      {stats && !isFetching && (
        <div dir="ltr">
          <ResponsiveContainer height={280} className="dashboard__area">
            <AreaChart
              data={stats.simulacoesPorDia}
              margin={{ top: 20, left: -15, bottom: 20 }}
            >
              <XAxis dataKey="data" tickLine={false} reversed={dir === 'rtl'} />
              <YAxis
                tickLine={false}
                orientation={dir === 'rtl' ? 'right' : 'left'}
              />
              <Tooltip {...getTooltipStyles(theme, 'defaultItems')} />
              <Legend />
              <CartesianGrid />
              <Brush
                dataKey="data"
                height={12}
                stroke={brush(theme)}
                fill={brush(theme)}
              />
              <Area
                name="Saque Antecipação FGTS"
                type="monotone"
                dataKey="cont-1"
                fill="#4ce1b6"
                stroke="#4ce1b6"
                fillOpacity={0.2}
              />
              <Area
                name="Crédito Consignado"
                type="monotone"
                dataKey="cont-2"
                fill="#70bbfd"
                stroke="#70bbfd"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
};

export default SimulacoesPorDiaGrafico;
