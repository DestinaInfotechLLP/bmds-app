import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import Services from "../API/Services";
import axios from "axios";
import { APP_URL, IMG_URL } from "@env";
import { Colors } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";

const ServicesWidget = ({ category, navigation }) => {
  const [services, setServices] = useState({});
  const scrollViewRef = useRef(null);

  useEffect(() => {
    getServices();
  }, []);

  const toNextPage = (screenIndex) => {
    console.log(screenIndex);
    screenIndex = screenIndex + 1;
    scrollViewRef.current?.scrollTo({
      x: Dimensions.get("window").width * screenIndex,
      y: 0,
      animated: true,
    });
  };

  const getServices = () => {
    axios
      .get(`${APP_URL}/guest/services/`)
      .then(function (response) {
        setServices(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        // ESLint
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeaderTitle}>
        <View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => toNextPage(category.id)}>
            <Entypo color={Colors.blue800} name="arrow-long-right" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.serviceContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          <FetchData
            services={services}
            navigation={navigation}
            category={category}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  serviceContainer: {
    flexDirection: "row",
    flex: 1,
  },
  serveiceCard: {
    width: 200,
    height: 100,
    marginRight: 10,
    // flex: 1,
    borderRadius: 10,
  },
  serviceImg: {
    borderRadius: 10,
  },
  scrollView: {
    marginVertical: 20,
  },
  serviceText: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "600",
    color: "#ffffff",
    paddingTop: 5,
    flexWrap: "wrap",
    width: 200,
    textAlign: "center",
  },
  backgroundImg: {
    height: "100%",
    justifyContent: "flex-end",
    borderRadius: 10,
  },
  headerTextView: {
    // flex: 1,
    // fontSize: 12,
    // fontWeight: "600",
    color: Colors.blue800,
    // textDecorationLine: "underline",
  },
  cardHeaderTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ServicesWidget;

const FetchData = ({ services, navigation, category }) => {
  if (services.success) {
    return services.data.map((service) => {
      // console.log(service.name);
      if (service.category_id == category.id) {
        return (
          <View key={service.id}>
            <View style={styles.serveiceCard}>
              <View style={styles.serviceImg}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Service", { id: service.id })
                  }
                >
                  <Image
                    source={{
                      uri:
                        service.service_photo == null
                          ? "https://us.123rf.com/450wm/artinspiring/artinspiring1710/artinspiring171000917/88752959-woman-s-driver-license-id-card-and-automobile-.jpg"
                          : `${IMG_URL}/services/${service.service_photo}`,
                    }}
                    resizeMode="contain"
                    style={styles.backgroundImg}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.serviceText}>{service.name}</Text>
          </View>
        );
      }
    });
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      }}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
