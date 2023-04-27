package com.dsi.appDisfraces.auth.service.seeders;

import com.dsi.appDisfraces.entity.ConfigurationEntity;
import com.dsi.appDisfraces.repository.IConfigurattionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StartData {

  private final IConfigurattionRepository configurattionRepository;

  @EventListener
  public void seed (ContextRefreshedEvent event){
    List<ConfigurationEntity> limits = configurattionRepository.findAll();
    if(limits.isEmpty()){
      this.createLimits();
    }
  }

  private void createLimits(){
    this.createLimit(1l, 1.00);
  }

  private void createLimit(long l ,Double num){
    ConfigurationEntity limit = new ConfigurationEntity();
    limit.setBillingLimit(1.00);
    configurattionRepository.save(limit);
  }




}
