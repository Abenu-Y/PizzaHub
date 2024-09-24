
import { Avatar, Box, CardContent, CardMedia, Typography, CardHeader, Card } from '@mui/material';
import avatarImg from '../../assets/image/Ellipse8.png';
import av_powerImg from '../../assets/image/Group2.png';
import av_2k from '../../assets/image/2k.png';

type Props={
    r_name:string,
    description:string
}

const RestuarantCard = ({r_name,description}:Props) => {
  return (
    <Card sx={{ display: 'flex', gap: 2, borderRadius: 2 }} className="w-[298px] md:w-[574px] h-[90px] md:h-[154px] shrink-0">
      <Box sx={{ display: 'flex', flexDirection: 'column' }} className="w-[55%] md:p-[20px] md:mb-[20px]">
        <CardHeader
          avatar={<Avatar alt="Azmera Pizza" src={avatarImg} />}
          title={r_name}
          titleTypographyProps={{ sx: { fontSize: '1.2rem', fontWeight: 600 } }}
          sx={{ padding: 0 }}
        />
        <Typography sx={{ fontFamily: 'Inter, sans-serif', pt: 1, pl: 1, fontSize: '1rem', color: 'rgba(0, 0, 0, 0.5)' }}>
          {description}
        </Typography>
      </Box>

      <Box className="w-[45%] flex flex-col justify-center pr-5">
        <CardContent sx={{ display: 'flex', gap: 1, bgcolor: '#0080000D', height: 108, borderRadius: 2 }}>
          <CardMedia component="img" sx={{ width: 80, height: 80 }} image={av_powerImg} alt="Power" />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography fontSize={10}>Number of Orders</Typography>
            <CardMedia component="img" image={av_2k} sx={{ width: 64, height: 47 }} />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RestuarantCard;
