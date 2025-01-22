import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, NavLink, Outlet } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import CartList from "../cart-list/CartList";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openCartList, setOpenCartList] = useState(false);

  const toggleCartList = (newOpen) => () => {
    setOpenCartList(newOpen);
  };

  const { cartItem } = useSelector((state) => state.cart);

  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawerWidth = 240;
  const navItems = [
    { id: 1, navItem: "Home", navLink: "/" },
    { id: 2, navItem: "About", navLink: "/" },
    { id: 3, navItem: "Contact", navLink: "/" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-Commerce
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item?.id} to={item?.navLink}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item?.navItem} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-Commerce
          </Typography>
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            {navItems.map((item) => (
              <Link key={item?.id} to={item?.navLink}>
                <Button sx={{ color: "#fff" }}>{item?.navItem}</Button>
              </Link>
            ))}
          </Box>
          <Button>
            <Badge badgeContent={cartItem?.length} color="secondary">
              <ShoppingCartIcon
                onClick={toggleCartList(true)}
                className="text-white"
              />
            </Badge>
          </Button>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <AccountCircleIcon sx={{ color: "#fff", fontSize: "28px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to={"/product-carts"} className="text-decoration-none">
                Product carts
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to={"/sign-up"} className="text-decoration-none">
                Sign Up
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to={"/sign-in"} className="text-decoration-none">
                Sign In
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
      <CartList openCartList={openCartList} toggleCartList={toggleCartList} />
    </Box>
  );
};

export default AppLayout;
