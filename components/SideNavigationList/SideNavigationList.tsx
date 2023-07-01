import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from './styles';

interface SideNavigationListProps {
  endpoints: Endpoint[];
  loggedIn: boolean;
  activeSegment: null | string;
}

const SideNavigationList = ({ endpoints, loggedIn, activeSegment }: SideNavigationListProps) => (
  <List>
    {endpoints.map((endpoint) => (
      <Link
        key={endpoint.text}
        style={styles.link}
        href={endpoint.guarded && !loggedIn ? "/sign-in" : endpoint.url}
      >
        <ListItem disablePadding>
          <ListItemButton selected={activeSegment === endpoint.targetSegment}>
            <ListItemIcon>{endpoint.icon}</ListItemIcon>
            <ListItemText primary={endpoint.text} />
          </ListItemButton>
        </ListItem>
      </Link>
    ))}
  </List>
);

export default SideNavigationList;
